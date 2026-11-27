# server

Node.js(Express 5) 서버입니다.

- 카카오모빌리티 길찾기 API를 대신 호출 (REST API 키는 여기서만 사용)
- 경로 위에 있는 코칭 지점(단속카메라 등)을 찾아서 앱에 전달
- 주행 기록 저장 (MongoDB) — 다음 단계

## 실행

```bash
cd server
npm install        # 처음 한 번
npm run dev        # 파일을 저장하면 자동으로 다시 시작
```

브라우저에서 http://localhost:4000/api/health 를 열어 `"db":"connected"`가 나오면 성공입니다.

## 폴더 구조

```
src/
├─ index.js        서버 시작점
├─ app.js          라우트 연결, 오류 처리
├─ config.js       .env 읽기
├─ db.js           MongoDB 연결
├─ models/         컬렉션 8개 스키마 (users, vehicles, places, saved_routes, trips,
│                  coaching_points, car_models, fuel_prices)
├─ routes/         API 주소
└─ services/       카카오 호출, 코칭 지점 찾기
```

## API

| 주소 | 설명 |
|---|---|
| `GET /api/health` | 서버·DB 상태 |
| `GET /api/directions` | 길찾기 + 경로 위 코칭 지점 |

`/api/directions` 파라미터

| 이름 | 필수 | 예시 | 설명 |
|---|---|---|---|
| origin | O | `127.1139,36.8151` | 출발지 **경도,위도** |
| destination | O | `127.1464,36.8101` | 도착지 **경도,위도** |
| waypoints |  | `127.12,36.81\|127.13,36.81` | 경유지 (`\|`로 구분, 5개까지) |
| priority |  | `RECOMMEND` | `RECOMMEND`, `TIME`, `DISTANCE` |
| avoid |  | `toll,schoolzone` | `ferries`, `toll`, `motorway`, `schoolzone`, `uturn` |
| fuel |  | `GASOLINE` | `GASOLINE`, `DIESEL`, `LPG`, `HYBRID` |
| hipass |  | `true` | 하이패스 여부 |
| alternatives |  | `true` | 대안 경로도 받기 |

응답: `routes[]` 안에 `distance`(m), `duration`(초), `toll`(원), `path`(지도에 그릴 [경도, 위도] 배열), `roads`(도로별 교통 상황), `guides`(회전 안내), `coachingPoints`(경로 위 코칭 지점, 출발지에서 가까운 순서)

## 꼭 지킬 것

- **카카오 응답은 DB에 저장하거나 캐싱하지 않기.** 카카오 정책상 금지예요. 화면에 보여 주는 데만 써요.
- **좌표는 항상 [경도, 위도] 순서.** MongoDB와 카카오 모두 경도(x)가 먼저예요.
- `.env`는 절대 커밋하지 않기. 키는 이 서버 코드에서만 써요.
