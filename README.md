# FuelCoach — 연비 코칭 앱

주행 중 교차로·내리막·제한속도 감소 구간 앞에서 **"지금 가속 페달에서 발을 떼세요"** 처럼
탄력주행 시점을 음성으로 알려주는 PWA(웹앱)입니다.

> 같은 길도 어떻게 달리느냐에 따라 연비가 달라집니다.

---

## 주요 기능 (MVP)

- 목적지 입력 → 경로 분석
- 코칭 3종: **회전 지점 · 내리막 · 제한속도 감소**
- 주행 중 음성 코칭 (화면을 켜둔 상태, 거치대 사용 전제)
- 나의 주행 기록: 연비 운전 점수, 추정 연비, 탄소 절감량, 주유 기록
- 대상 지역: 천안

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 프론트 | PWA (프레임워크 결정 예정) + 카카오 지도 JavaScript API |
| 서버 | Node.js (프레임워크 결정 예정) |
| DB | MongoDB Atlas |
| 데이터 처리 | Python (rasterio, geopandas, pymongo) |
| 외부 API | 카카오모빌리티 길찾기 API |
| 공공 데이터 | 국토지리정보원 DEM, 국가 표준노드링크, 무인교통단속카메라 데이터 |
| 개발 도구 | VS Code, Git, GitHub |

## 폴더 구조

```
FuelCoach/
├─ client/    PWA 프론트 (지도, GPS, 음성 코칭, 화면)
├─ server/    Node.js 서버 (길찾기 API 호출, 코칭 지점 API, 기록 저장)
├─ data/      Python 데이터 전처리 (경사 계산, 도로 데이터 정리)
└─ .vscode/   팀 공용 VS Code 추천 확장 목록
```

## 개발 환경 설치

아래 프로그램은 **VS Code 확장이 아니라 컴퓨터에 따로 설치**해야 합니다.

| 프로그램 | 설치 | 확인 명령어 |
|---|---|---|
| Node.js (LTS) | https://nodejs.org | `node -v`, `npm -v` |
| Python | https://www.python.org (윈도우: 설치 시 **Add python.exe to PATH 체크**) | `python --version` |
| Git | https://git-scm.com | `git --version` |
| VS Code | https://code.visualstudio.com | |

VS Code에서 이 폴더를 열면 **추천 확장 설치 알림**이 뜹니다. 전부 설치해 주세요.
(ESLint, Prettier, MongoDB for VS Code, Python)

## 처음 시작하기

```bash
# 1. 저장소 받기
git clone https://github.com/FuelCoachApp/FuelCoach.git
cd FuelCoach

# 2. 환경 변수 파일 만들기 (.env.example을 복사해서 .env로 이름 변경)
#    실제 값은 팀장에게 개인 메시지로 받기
#    - server/.env
#    - client/.env
#    - data/.env

# 3. 데이터 처리용 Python 환경 만들기
cd data
python -m venv .venv
.venv\Scripts\activate          # 맥: source .venv/bin/activate
pip install -r requirements.txt
```

client, server 실행 방법은 프레임워크가 정해지면 이 문서에 추가합니다.

## 환경 변수

| 파일 | 변수 | 설명 |
|---|---|---|
| `server/.env` | `MONGODB_URI` | MongoDB Atlas 연결 문자열 |
| `server/.env` | `KAKAO_REST_API_KEY` | 카카오 REST API 키 (길찾기용, **서버에서만 사용**) |
| `client/.env` | `KAKAO_JS_KEY` | 카카오 JavaScript 키 (지도 표시용) |
| `client/.env` | `API_BASE_URL` | 서버 주소 |
| `data/.env` | `MONGODB_URI` | 전처리 결과를 DB에 저장할 때 사용 |

## 협업 규칙

- **main 브랜치에 직접 push 하지 않기** → 브랜치를 만들고 Pull Request로 합치기
- 브랜치 이름: `feature/기능이름`, `fix/버그이름` (예: `feature/voice-coaching`)
- 커밋 메시지 앞머리
  - `feat:` 새 기능
  - `fix:` 버그 수정
  - `docs:` 문서 수정
  - `refactor:` 동작은 같고 코드만 정리
  - `chore:` 설정, 패키지 등 기타
- Pull Request는 **팀원 1명 이상 확인 후** 합치기

## 보안 주의

- **키·비밀번호는 절대 커밋하지 않기.** `.env` 파일은 `.gitignore`로 자동 제외됩니다.
- 키·DB 비밀번호를 **단톡방에 올리지 않기.** 개인 메시지로만 주고받기.
- 카카오 **REST API 키는 서버 코드에서만** 사용하기. 프론트 코드에 넣으면 누구나 볼 수 있습니다.
- 실수로 키를 올렸다면 바로 팀장에게 알리고 키를 재발급하기.

## 참고 링크

- 카카오 디벨로퍼스: https://developers.kakao.com
- 카카오모빌리티 개발자 센터: https://developers.kakaomobility.com
- MongoDB Atlas: https://www.mongodb.com/atlas
