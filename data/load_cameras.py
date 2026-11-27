"""
무인교통단속카메라 CSV에서 천안 지역만 골라 MongoDB coaching_points 컬렉션에 넣어요.

데이터: 공공데이터포털 '전국무인교통단속카메라표준데이터' (15028200) CSV
사용법 (data 폴더에서, 가상환경 켠 상태):
    python load_cameras.py raw/카메라.csv --dry-run   # DB에 안 넣고 미리보기만
    python load_cameras.py raw/카메라.csv             # DB에 넣기 (여러 번 돌려도 중복 안 생김)
"""
import argparse
import hashlib
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

DATASET = "15028200"
REGION = "천안"
# 천안시 대략 범위 (경도 최소, 위도 최소, 경도 최대, 위도 최대). 주소 컬럼이 없을 때만 써요.
BBOX = (126.95, 36.65, 127.40, 37.00)


def read_csv(path):
    # 공공데이터 CSV는 cp949(한글 윈도우)인 경우가 많아서 두 가지를 차례로 시도해요.
    for enc in ("utf-8-sig", "cp949"):
        try:
            return pd.read_csv(path, encoding=enc, dtype=str)
        except UnicodeDecodeError:
            continue
    sys.exit("[오류] 파일 인코딩을 읽지 못했어요. 엑셀에서 'CSV UTF-8'로 다시 저장해 주세요.")


def find_col(df, *keywords, required=False):
    # 컬럼 이름이 조금 달라도 찾을 수 있게 키워드가 들어 있는 컬럼을 찾아요.
    for kw in keywords:
        for col in df.columns:
            if kw in str(col).replace(" ", ""):
                return col
    if required:
        sys.exit(f"[오류] '{keywords[0]}' 컬럼을 못 찾았어요. 파일의 컬럼: {list(df.columns)}")
    return None


def num(value):
    try:
        v = float(str(value).strip())
        return v if v == v else None  # NaN 제외
    except (TypeError, ValueError):
        return None


def text(value):
    if value is None or (isinstance(value, float) and value != value):
        return None
    s = str(value).strip()
    return s or None


def filter_region(df):
    cols = [c for c in (find_col(df, "시군구"), find_col(df, "도로명주소"), find_col(df, "지번주소")) if c]
    if cols:
        mask = pd.Series(False, index=df.index)
        for c in cols:
            mask |= df[c].fillna("").str.contains(REGION)
        return df[mask], f"주소 컬럼 {cols}에 '{REGION}' 포함"
    return df, "주소 컬럼 없음 → 좌표 범위로만 거름"


def build_docs(df):
    lat_c = find_col(df, "위도", required=True)
    lng_c = find_col(df, "경도", required=True)
    id_c = find_col(df, "관리번호")
    limit_c = find_col(df, "제한속도")
    kind_c = find_col(df, "단속구분")
    place_c = find_col(df, "설치장소")
    dir_c = find_col(df, "방향")
    zone_c = find_col(df, "보호구역")
    addr_c = find_col(df, "도로명주소", "지번주소")

    now = datetime.now(timezone.utc)
    docs, skipped, swapped = [], 0, 0
    for row in df.to_dict("records"):
        lat, lng = num(row[lat_c]), num(row[lng_c])
        if lat is None or lng is None:
            skipped += 1
            continue
        if 124 <= lat <= 132 and 33 <= lng <= 39:  # 위도·경도가 뒤바뀐 행 바로잡기
            lat, lng = lng, lat
            swapped += 1
        if not (BBOX[0] <= lng <= BBOX[2] and BBOX[1] <= lat <= BBOX[3]):
            skipped += 1
            continue

        limit = num(row[limit_c]) if limit_c else None
        attrs = {
            "limitKmh": int(limit) if limit else None,
            "enforcement": text(row[kind_c]) if kind_c else None,  # 단속구분 (과속/신호 등)
            "place": text(row[place_c]) if place_c else None,
            "direction": text(row[dir_c]) if dir_c else None,
            "protectedZone": text(row[zone_c]) if zone_c else None,
            "address": text(row[addr_c]) if addr_c else None,
        }
        attrs = {k: v for k, v in attrs.items() if v is not None}

        source_id = text(row[id_c]) if id_c else None
        if not source_id:  # 관리번호가 없으면 좌표+단속구분으로 고유값을 만들어요.
            raw = f"{lng:.6f},{lat:.6f},{attrs.get('enforcement', '')}"
            source_id = "h_" + hashlib.sha1(raw.encode()).hexdigest()[:16]

        docs.append({
            "type": "CAMERA",
            "location": {"type": "Point", "coordinates": [lng, lat]},  # [경도, 위도] 순서!
            "attrs": attrs,
            "source": {"dataset": DATASET, "sourceId": source_id, "fetchedAt": now},
        })
    return docs, skipped, swapped


def save(docs, collection):
    from pymongo import UpdateOne

    now = datetime.now(timezone.utc)
    ops = [
        UpdateOne(
            {"source.dataset": d["source"]["dataset"], "source.sourceId": d["source"]["sourceId"]},
            {
                "$set": {
                    "type": d["type"],
                    "location": d["location"],
                    "attrs": d["attrs"],
                    "source.fetchedAt": d["source"]["fetchedAt"],
                    "updatedAt": now,
                },
                "$setOnInsert": {
                    "source.dataset": d["source"]["dataset"],
                    "source.sourceId": d["source"]["sourceId"],
                    "createdAt": now,
                },
            },
            upsert=True,
        )
        for d in docs
    ]
    if not ops:
        return 0, 0
    result = collection.bulk_write(ops, ordered=False)
    collection.create_index([("location", "2dsphere")])
    return result.upserted_count, result.modified_count


def get_collection():
    from dotenv import load_dotenv
    from pymongo import MongoClient

    load_dotenv(Path(__file__).with_name(".env"))
    uri = os.getenv("MONGODB_URI")
    if not uri:
        sys.exit("[오류] data/.env에 MONGODB_URI가 비어 있어요.")
    client = MongoClient(uri, serverSelectionTimeoutMS=10000)
    client.admin.command("ping")
    db = client.get_default_database(default="fuelcoach")
    print(f"[DB] 연결 성공: DB 이름 {db.name}")
    return db["coaching_points"]


def main():
    parser = argparse.ArgumentParser(description="단속카메라 CSV → coaching_points")
    parser.add_argument("csv", help="CSV 파일 경로 (예: raw/카메라.csv)")
    parser.add_argument("--dry-run", action="store_true", help="DB에 넣지 않고 미리보기만")
    args = parser.parse_args()

    df = read_csv(args.csv)
    print(f"[읽기] 전체 {len(df)}행, 컬럼 {len(df.columns)}개")
    df, how = filter_region(df)
    print(f"[지역] {REGION}: {len(df)}행 ({how})")
    docs, skipped, swapped = build_docs(df)
    print(f"[변환] 저장할 지점 {len(docs)}개 / 좌표 없음·범위 밖 {skipped}개 / 위도·경도 뒤바뀐 것 바로잡음 {swapped}개")

    kinds = pd.Series([d["attrs"].get("enforcement", "(없음)") for d in docs]).value_counts()
    if len(kinds):
        print("[단속구분]", ", ".join(f"{k} {v}개" for k, v in kinds.items()))
    for d in docs[:3]:
        print("  예시:", d["location"]["coordinates"], d["attrs"])

    if args.dry_run:
        print("[미리보기] --dry-run이라 DB에는 넣지 않았어요.")
        return
    inserted, updated = save(docs, get_collection())
    print(f"[저장] 새로 넣음 {inserted}개, 기존 지점 갱신 {updated}개")


if __name__ == "__main__":
    main()
