# FuelCoach (연비 코칭 앱) — 화면 코드

피그마 와이어프레임 35개를 그대로 옮긴 React 코드예요. 와이어프레임 1개 = 폴더 1개예요.
폰 크기가 달라도 맞춰지도록 만들었어요 (가로 최대 430px, 아이폰 노치·홈 바 여백 자동 처리).

## 실행 방법 (맥북 기준)

1. 압축을 풀고 VS Code에서 `fuelcoach-app` 폴더를 엽니다. (`파일 > 폴더 열기`)
2. 터미널을 엽니다: `Ctrl + `` ` (백틱)
3. 아래 두 줄을 차례로 입력합니다.

```bash
npm install
npm run dev
```

4. 터미널에 나온 `http://localhost:5173` 을 `Cmd` 누른 채 클릭하면 **화면 목록**이 열려요.
5. 폰 크기로 보려면 크롬에서 `Cmd + Option + I` → 왼쪽 위 휴대폰 아이콘 → iPhone 14 Pro 선택.

> 휴대폰으로 직접 보려면 `npm run dev -- --host` 로 실행한 뒤, 같은 와이파이에서 터미널에 나온 `Network` 주소로 접속하세요.

## 와이어프레임 ↔ 폴더 (1개 = 1개)

`src/screens/` 안에 프레임마다 폴더가 하나씩 있어요. 폴더 안에 그 화면의 코드(`.tsx`)와 화면 전용 스타일(`.css`)이 같이 들어 있어요.
파일 맨 위 주석에 프레임 이름과 주소가 적혀 있어요.

| # | 와이어프레임 | 폴더 (`src/screens/`) | 들어 있는 파일 | 주소 |
|---|---|---|---|---|
| 1 | 회원가입 | `01_Signup/` | `SignupScreen.tsx` `SignupScreen.css` | `/signup` |
| 2 | 아이디 찾기 | `02_FindId/` | `FindIdScreen.tsx` `FindIdScreen.css` | `/find-id` |
| 3 | 비밀번호 찾기 | `03_FindPassword/` | `FindPasswordScreen.tsx` | `/find-password` |
| 4 | 내 차 설정 | `04_CarPreset/` | `CarPresetScreen.tsx` | `/car/new` |
| 5 | 내 차 설정 · 하이브리드 유종 선택 | `05_CarPresetHybrid/` | `CarPresetHybridScreen.tsx` `CarPresetHybridScreen.css` | `/car/new/hybrid` |
| 6 | 내 차 수정 | `06_CarEdit/` | `CarEditScreen.tsx` | `/car/edit` |
| 7 | 메인 | `07_Main/` | `MainScreen.tsx` `MainScreen.css` | `/main` |
| 8 | 즐겨찾기 관리 | `08_Favorites/` | `FavoritesScreen.tsx` `FavoritesScreen.css` | `/favorites` |
| 9 | 장소 등록 | `09_PlaceRegister/` | `PlaceRegisterScreen.tsx` `PlaceRegisterScreen.css` | `/places/new` |
| 10 | 차량 선택 시트 | `10_VehicleSelect/` | `VehicleSelectScreen.tsx` | `/drive/vehicle` |
| 11 | 출발 시간 추천 시트 | `11_DepartureTime/` | `DepartureTimeScreen.tsx` `DepartureTimeScreen.css` | `/drive/departure` |
| 12 | 주행 (기본) | `12_Drive/` | `DriveScreen.tsx` `DriveScreen.css` | `/drive` |
| 13 | 주행 · 코칭 강조 (초록) | `13_DriveCoachEmphasis/` | `DriveCoachEmphasisScreen.tsx` | `/drive/coach` |
| 14 | 주행 · 길안내 강조 (빨강) | `14_DriveGuideEmphasis/` | `DriveGuideEmphasisScreen.tsx` | `/drive/guide` |
| 15 | 주행 · 다른 경로 시트 | `15_DriveRoutesSheet/` | `DriveRoutesSheetScreen.tsx` `DriveRoutesSheetScreen.css` | `/drive/routes` |
| 16 | 주행 · 소리 설정 시트 | `16_DriveSoundSheet/` | `DriveSoundSheetScreen.tsx` | `/drive/sound` |
| 17 | 안심주행 | `17_SafeDrive/` | `SafeDriveScreen.tsx` `SafeDriveScreen.css` | `/drive/safe` |
| 18 | 도착 | `18_Arrive/` | `ArriveScreen.tsx` `ArriveScreen.css` | `/drive/arrive` |
| 19 | 설정 | `19_Settings/` | `SettingsScreen.tsx` `SettingsScreen.css` | `/settings` |
| 20 | 코칭 알림 종류 | `20_CoachingCatalog/` | `CoachingCatalogScreen.tsx` `CoachingCatalogScreen.css` | `/dev/coaching` |
| 21 | 로딩 화면 | `21_Splash/` | `SplashScreen.tsx` `SplashScreen.css` | `/splash` |
| 22 | 로그인 | `22_Login/` | `LoginScreen.tsx` `LoginScreen.css` | `/login` |
| 23 | 사용 가이드 1/4 · 음성 코칭 | `23_Guide1/` | `Guide1Screen.tsx` `Guide1Screen.css` | `/guide/1` |
| 24 | 사용 가이드 2/4 · 탄력주행 | `24_Guide2/` | `Guide2Screen.tsx` | `/guide/2` |
| 25 | 사용 가이드 3/4 · 퓨얼컷 | `25_Guide3/` | `Guide3Screen.tsx` `Guide3Screen.css` | `/guide/3` |
| 26 | 사용 가이드 4/4 · 리포트 | `26_Guide4/` | `Guide4Screen.tsx` `Guide4Screen.css` | `/guide/4` |
| 27 | 목적지 검색 | `27_Search/` | `SearchScreen.tsx` `SearchScreen.css` | `/search` |
| 28 | 경로 추천 | `28_RouteRecommend/` | `RouteRecommendScreen.tsx` `RouteRecommendScreen.css` | `/route` |
| 29 | 경로 추천 · 이 경로 즐겨찾기 | `29_RouteFavoriteSheet/` | `RouteFavoriteSheetScreen.tsx` `RouteFavoriteSheetScreen.css` | `/route/favorite` |
| 30 | 주행 리포트 | `30_Report/` | `ReportScreen.tsx` `ReportScreen.css` | `/report` |
| 31 | 나의 정보 | `31_MyPage/` | `MyPageScreen.tsx` `MyPageScreen.css` | `/my` |
| 32 | 내 차 관리 | `32_CarManage/` | `CarManageScreen.tsx` `CarManageScreen.css` | `/car/manage` |
| 33 | 공지사항 | `33_Notices/` | `NoticesScreen.tsx` `NoticesScreen.css` | `/notices` |
| 34 | 운전 정보 · 계기판 경고등 | `34_DrivingInfoLights/` | `DrivingInfoLightsScreen.tsx` `DrivingInfoLightsScreen.css` | `/driving-info` |
| 35 | 운전 정보 · 교통법규 | `35_DrivingInfoLaws/` | `DrivingInfoLawsScreen.tsx` `DrivingInfoLawsScreen.css` | `/driving-info/laws` |

그 밖에 `00_ScreenList/`(화면 목록, `/`)와 `99_ComingSoon/`(없는 주소로 가면 보이는 '준비 중' 화면)가 있어요.

### 같은 화면의 다른 상태인 프레임
- **주행 13~16번**은 12번 `12_Drive/DriveScreen.tsx` 를 바탕으로 써요. 강조 프레임은 `emphasis` 값만 바꾼 것이고, 시트 프레임은 바탕 위에 시트 코드만 얹었어요.
  실제 앱에서는 코칭 알림이 올 때 `DriveScreen` 의 `emphasis` 값만 바꾸면 돼요.
- **29번 경로 즐겨찾기 시트**는 28번 `28_RouteRecommend/RouteRecommendScreen.tsx` 위에 시트를 얹은 것이에요.
- **23~26번 사용 가이드**는 `components/guide/GuideLayout.tsx` 틀을 같이 쓰고, 프레임 파일에는 가운데 그림만 있어요.
- **34·35번 운전 정보**는 위쪽 탭으로 서로 오가요 (`components/info/DrivingInfoParts.tsx`).
- **5번 하이브리드 시트**는 4번 `04_CarPreset/CarPresetScreen.tsx` 위에 시트를 얹은 것이에요. 시트 코드(`HybridSheet`)는 6번 내 차 수정에서도 가져다 써요.

## 폴더 구조

```
src/
├─ screens/        ← 와이어프레임 1개 = 폴더 1개 (01_Signup/ ~ 35_DrivingInfoLaws/)
├─ components/
│  ├─ ui/       버튼·입력창·카드·탭·토글·시트 등 공통 부품 (index.tsx, ui.css, Icon.tsx)
│  ├─ drive/    주행 전용 부품 (길안내 카드, 코칭 카드, 속도 표지판, 하단 바…)
│  ├─ car/      내 차 입력 폼 (4·5·6번 프레임 공용)
│  ├─ account/  이메일 인증 칸, 찾기 탭 (2·3번 프레임 공용)
│  ├─ guide/    사용 가이드 틀 (23~26번 공용)
│  ├─ info/     운전 정보 머리·탭 (34·35번 공용)
│  └─ map/      지도 자리 (카카오 지도 연결할 곳)
├─ mocks/data.ts   화면에 보이는 가짜 데이터 — 서버 붙이면 여기만 교체
├─ hooks/useCountdown.ts  3:00 인증 타이머, 도착 10초 타이머
└─ styles/
   ├─ global.css          색·글자·간격 (디자인 토큰)
   └─ screens-shared.css  여러 화면이 같이 쓰는 스타일 (지도 위 버튼, 선택 카드 등)
```

## 공통 부품 쓰는 법

```tsx
import { Button, TextField, Card } from '../components/ui'

<Button variant="primary" onClick={handleSave}>저장</Button>          // 민트로 채운 버튼
<Button onClick={handleNext}>다음</Button>                            // 기본: 민트 테두리
<Button variant="secondary" size="sm">취소</Button>                   // 회색 테두리, 작은 크기
<Button loading={saving} onClick={handleSave}>저장</Button>           // 기다리는 동안 빙글빙글
<Button disabled={!agreed}>가입하기</Button>                          // 누를 수 없는 상태

<TextField label="아이디" help="8~20자 사이" status="error" />          // 빨간 안내
<TextField label="이메일" addon={{ label: '인증', onClick: send }} />   // 오른쪽 버튼
```

색을 바꾸려면 `src/styles/global.css` 맨 위의 `--mint` 같은 값만 고치면 앱 전체에 적용돼요.

## 버튼에 기능 붙이기

`TODO.md` 에 화면별·버튼별로 붙일 기능과 함수 이름을 정리해 뒀어요.

## 일부러 뺀 것

- **상단 상태 바(9:41, 배터리)와 하단 홈 바**: 폰이 직접 그려주는 부분이라 코드에 넣지 않았어요.
- **지도**: 카카오 지도를 연결하기 전이라 도로 모양 그림으로 대신했어요. (`components/map/MapView.tsx`)
