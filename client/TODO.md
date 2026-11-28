# 버튼별로 붙일 기능 (TODO)

지금은 화면이 넘어가는 것까지만 연결돼 있어요.
화면 파일은 `src/screens/번호_이름/` 폴더 안에 있어요 (예: 회원가입 → `01_Signup/SignupScreen.tsx`).
코드에서 `TODO` 로 검색하면 아래 항목 위치가 모두 나와요. (VS Code: `Cmd + Shift + F` → `TODO`)

- **(기능)**: 버튼을 누르면 실행될 동작
- **(데이터)**: 가짜 값을 실제 값으로 바꿀 곳
- **(확인 필요)**: 디자인에서 정해지지 않아 제가 가정한 부분

함수 이름은 `handle` + 동작 이름으로 되어 있어요. 기능을 넣을 때는 이 함수 안만 채우면 돼요.

---

## 공통

| 위치 | 할 일 |
|---|---|
| `components/map/MapView.tsx` | **(지도)** 카카오 지도 SDK 연결. 이 파일만 바꾸면 모든 화면에 적용돼요 |
| `mocks/data.ts` | **(데이터)** 서버·API를 붙이면 이 파일의 가짜 값을 실제 응답으로 교체 |
| `components/drive/DriveParts.tsx` → `useCoachVoice` | 코칭 음성(TTS) 실제로 켜고 끄기 |
| `components/drive/DriveParts.tsx` → `DriveBottomBar` | 목적지 ↔ 현재 도로명 몇 초마다 번갈아 보여주기 |

## 계정

### 회원가입 `SignupScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 중복 확인 | `handleCheckNickname` | 2~20자 검사 → 닉네임 중복 확인 API |
| 인증 확인 | `handleSendEmailCode` | 이메일로 인증번호 보내기 API (3:00 타이머는 이미 동작) |
| 보기 › | `handleOpenTerm` | 약관 상세 화면 또는 웹페이지 열기 |
| 가입하고 내 차 설정하기 | `handleSubmit` | 입력값 검사 → 회원가입 API → `/car/new` |

> ⚠ 원래 프레임에 제출 버튼이 없어서 **'가입하고 내 차 설정하기' 버튼을 추가**했어요.

### 아이디 찾기 `FindIdScreen.tsx` · 비밀번호 찾기 `FindPasswordScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| (이메일 입력 후) | `EmailVerifyFields` (`components/account/AccountParts.tsx`) | 인증번호 보내기 버튼 또는 자동 발송 연결 |
| 결과 카드 | `FindIdScreen` 의 `result` | 인증 성공 시 서버에서 받은 아이디 표시 (지금은 항상 보임) |
| 로그인하기 | `handleGoLogin` | 로그인 화면으로 (로그인 화면 디자인 나오면 연결) |
| 비밀번호 변경 | `handleChangePassword` | 새 비밀번호 검사 → 변경 API → 로그인 화면 |

## 내 차

### 내 차 설정 `CarPresetScreen.tsx` · 하이브리드 유종 선택 `CarPresetHybridScreen.tsx` · 내 차 수정 `CarEditScreen.tsx`
세 화면 모두 `components/car/CarForm.tsx` 를 같이 써요.

| 버튼 | 함수 | 할 일 |
|---|---|---|
| 제조사 선택 | `handleMakerChange` | 제조사에 맞는 모델 목록을 공공데이터에서 불러오기 |
| 하이브리드 ▾ | `handleOpenHybrid` | (동작함) 하이브리드 유종 선택 프레임으로 이동 |
| 선택 완료 | `handleDone` | (동작함) 고른 유종을 폼에 넣고 돌아가기 |
| 다음 | `handleNext` | 연료 미선택 안내 → 내 차 저장 API → `/main` |
| 저장 | `handleSave` | 내 차 수정 API. `loading` 표시는 이미 연결됨 |
| (수정 화면 초기값) | `CarEditScreen` 의 `useState(...)` | **(데이터)** 서버에 저장된 내 차 정보로 채우기 |

## 홈 · 장소

### 메인 `MainScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 어디로 갈까요? | `handleSearch` | (바로 이동) `/search` |
| 화살표 버튼 (테두리) | `handleSafeDrive` | GPS 권한 확인 → 안심주행 시작 |
| 민트 사각 버튼 | `handleToggleCoachVoice` | **(확인 필요)** 빈 버튼이라 '코칭 음성 켜기/끄기'로 가정 |
| 내 위치 | `handleLocate` | 지도를 내 위치로 이동 |
| 즐겨찾기·최근 목적지 줄 | `handleOpenPlace` | 고른 장소를 목적지로 넘기기 → `/route` |
| + 즐겨찾기 추가 | (바로 이동) | `/favorites` |

### 즐겨찾기 관리 `FavoritesScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 편집 | `handleToggleEdit` | 순서 바꾸기(드래그), 삭제 버튼 보이기 |
| ✏ 연필 | `handleEditRoute` | 경로 이름·경유지 수정 |
| 경로 카드 | `handleOpenRoute` | 저장된 경로로 바로 안내 |
| 장소 줄 | `handleOpenPlace` | 장소를 목적지로 안내 |
| 등록하기 › | (바로 이동) | `/places/new` |

> 디자인에 장소·경로 두 묶음이 함께 보여서, 위쪽 탭은 **고른 묶음을 위로 올리는** 방식으로 만들었어요.

### 장소 등록 `PlaceRegisterScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 검색창 | `handleSearch` | 카카오 장소 검색 |
| 직접 입력 | — | 이름 입력창 띄우기 |
| ○○로 저장 | `handleSave` | 지도 중심 좌표 + 이름 저장 → `/favorites` |

## 주행

### 차량 선택 시트 `VehicleSelectScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 임시 차량으로 운전 | `handleTempVehicle` | 임시 차량 입력 시트 (기록 따로 저장) |
| 이 차로 안내 시작 | `handleStart` | 고른 차량 id를 주행 세션에 저장 → `/drive` |

### 출발 시간 추천 시트 `DepartureTimeScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 지금 안내 시작 | `handleStart` | '지금'이면 바로 주행, 아니면 출발 알림 예약 |

> ⚠ 디자인의 '확인 필요' 그대로: 카카오 출발 시간 예측 API를 쓸 수 있을 때만 사용.

### 주행 `DriveScreen.tsx` (+ 코칭 강조 `DriveCoachEmphasisScreen.tsx`, 길안내 강조 `DriveGuideEmphasisScreen.tsx`)
| 버튼 | 함수 | 할 일 |
|---|---|---|
| ↻ 새로고침 | `handleReroute` | 현재 위치 기준으로 경로 다시 검색 |
| ☰ 메뉴 | `handleMenu` | **(확인 필요)** 지금은 '다른 경로' 프레임(`/drive/routes`). '소리 설정'을 여는 버튼 위치는 아직 없음 |
| (자동) | `emphasis` | 코칭 알림이 오면 `coach`, 회전 직전이면 `guide` 로 바꿔 지도 강조 |
| 내 위치 | `handleLocate` | 지도를 내 위치·진행 방향으로 |
| 코칭 카드 위로 밀기 | `voice.mute` | (동작함) 음소거 바로 바뀜 → 실제 TTS 끄기 연결 |
| 당겨서 켜기 | `voice.unmute` | (동작함) → 실제 TTS 켜기 연결 |
| (자동) | `handleArrive` | 목적지 30m 이내면 호출 → `/drive/arrive` |
| 이 경로로 변경 | `handleChange` (`DriveRoutesSheetScreen.tsx`) | 고른 경로로 재탐색 |
| 소리 설정 시트 | `DriveSoundSheetScreen.tsx` | **(데이터)** 설정 화면과 같은 값을 쓰도록 전역 상태로 옮기기 |

> ☰ 메뉴 버튼은 '주행 (기본)' 프레임에는 없고 강조 프레임 2개에만 있어서, 시트로 들어가는 입구로 쓰려고 **모든 주행 상태에 넣었어요.**

### 안심주행 `SafeDriveScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 목적지 설정 | `handleSetDestination` | 목적지 검색 → 경로 안내로 전환 |
| 주행 종료 | `handleEnd` | 종료 확인 → 기록 저장 → 리포트 |
| 내 위치 | `handleLocate` | 지도를 내 위치로 |

### 도착 `ArriveScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 주행 종료 (원형 타이머) | `handleEnd` | 기록 저장 API → 리포트. 10초 카운트다운은 이미 동작 |
| 계속 주행하기 | `handleContinue` | 안심주행으로 이어가기 |
| (자동 이동) | `useCountdown` | 설정의 '자동 이동'이 꺼져 있으면 타이머 끄기 |

## 기타

### 설정 `SettingsScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 토글·슬라이더 전체 | `initialSettings` | **(데이터)** 기기(localStorage)나 서버에 저장·불러오기 |
| 주행 중 화면 켜두기 | — | Screen Wake Lock API 연결 |
| 테마 | — | 라이트 테마 색 변수 추가 → `<html data-theme>` 전환 |
| 약관 4개 | `handleOpenPolicy` | 약관 웹페이지 열기 |
| 비밀번호 변경 | (바로 이동) | `/find-password` |
| 로그아웃 | `handleLogout` | 확인 팝업 → 토큰 삭제 → 로그인 |
| 회원 탈퇴 | `handleWithdraw` | 확인 팝업(비밀번호 재입력) → 탈퇴 API |

### 코칭 알림 종류 `CoachingCatalogScreen.tsx`
개발·디자인 확인용 화면이에요. 실제 주행 화면에는 `CoachingAlert`, `BumpChip`, `MutedBar` 부품을 가져다 써요.

## 아직 디자인이 없는 화면
없는 주소로 가면 `99_ComingSoon` '준비 중' 화면이 보여요.
새 프레임이 나오면 `src/screens/` 에 `36_이름/` 폴더를 만들고 `App.tsx` 에 주소 한 줄을 추가하면 돼요.

---

# 21~35번 프레임

### 로딩 화면 `21_Splash/SplashScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| (자동 2.5초) | `useEffect` | 로그인 토큰 확인 → 있으면 `/main`, 처음이면 `/guide/1`, 없으면 `/login` (지금은 항상 `/login`) |
| 로고 칸 | — | **(디자인)** 로고 · 워드마크가 나오면 넣기 |

### 로그인 `22_Login/LoginScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 로그인 | `handleLogin` | 로그인 API → 토큰 저장 → `/main`. 실패하면 입력창 `status="error"` |
| Google · 카카오 · 네이버 | `handleSocialLogin` | 각 회사 로그인(OAuth) 연결 + 공식 로고로 교체 |
| 아이디 찾기 · 비밀번호 찾기 · 회원가입 | (바로 이동) | `/find-id` · `/find-password` · `/signup` |
| 워드마크 칸 | — | **(디자인)** 워드마크가 나오면 넣기 |

### 사용 가이드 `23_Guide1` ~ `26_Guide4` (틀: `components/guide/GuideLayout.tsx`)
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 다음 · 건너뛰기 · 시작하기 | `handleNext` · `handleSkip` | (동작함) 마지막 장 · 건너뛰기 → `/main` |
| (공통) | `finishGuide` | 가이드를 본 적 있다고 기기에 저장 → 다음 실행부터 바로 메인 |

### 목적지 검색 `27_Search/SearchScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 검색창 | `query` | 카카오 장소 검색 API로 바꾸기 (지금은 목업에서 글자 포함 여부로 걸러요) |
| 결과 줄 | `handlePick` | 고른 장소를 목적지로 `/route` |

### 경로 추천 `28_RouteRecommend/RouteRecommendScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| + 경유지 추가 | `handleAddVia` | 경유지 검색 화면 |
| 경유지 ✕ | `handleRemoveVia` | (화면에서 빠짐) → 경로 다시 찾기 |
| 주변 주유소 ON | `handleToggleGas` | (켜고 끄기 동작함) → 오피넷 API로 가격 불러오기 |
| ★ 저장 | (바로 이동) | `/route/favorite` |
| 출발 시간 비교 | (바로 이동) | `/drive/departure` |
| 경로 카드 3개 | `setSelected` | (선택 동작함) |
| 안내 시작 | `handleStart` | 고른 경로를 주행 세션에 넘기기 → `/drive/vehicle` |
| 지도 선 색 | — | **(지도)** 길찾기 결과의 구간별 정체 정보로 칠하기 |

### 이 경로 즐겨찾기 `29_RouteFavoriteSheet/RouteFavoriteSheetScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 저장 | `handleSave` | 이름 · 경유지 · 옵션을 경로 즐겨찾기로 저장 → 즐겨찾기 관리 · 홈에 표시 |

### 주행 리포트 `30_Report/ReportScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 지금까지 › | `handleOpenTotal` | 누적 기록 화면 (디자인 없음) |
| ‹ › 달 이동 | `handlePrevMonth` · `handleNextMonth` | 이전 · 다음 달 기록 불러오기 |
| 달력 날짜 | `setSelectedDay` | (동작함) 그날 주행 목록 표시. 이번 달 합계도 날짜별 금액으로 계산해요 |
| 주행 줄 | `handleOpenTrip` | 위쪽 에코 점수 카드를 그 주행으로 바꾸기 |

> 디자인 프레임에는 하단 탭바가 없지만, 리포트는 탭 화면이라 홈 · 나의 정보로 갈 수 있게 **탭바를 넣었어요.**

### 나의 정보 `31_MyPage/MyPageScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| ✎ 수정 | `handleEditProfile` | 닉네임 · 프로필 수정 (디자인 없음) |
| 내 차 수정 › | (바로 이동) | `/car/manage` |
| 설정 · 즐겨찾기 관리 · 사용 가이드 다시 보기 · 공지사항 | (바로 이동) | 각 화면 |
| 유가 기준 › | `handleFuelPrice` | 오피넷 전국 평균 자동 / 직접 입력 (디자인 없음) |

### 내 차 관리 `32_CarManage/CarManageScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 카드 길게 누르기 | `handleSetPrimary` | (화면에서 바뀜) → 본인 차량 변경 API |
| 수정 | `handleEdit` | 고른 차 정보를 들고 `/car/edit` |
| + 차량 추가 | `handleAdd` | **(확인 필요)** 추가 전용 화면이 없어서 지금은 `/car/edit` |

### 공지사항 `33_Notices/NoticesScreen.tsx`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 공지 줄 · 접기 | `toggle` | (펼치기 · 접기 동작함) → 공지 목록 API |

### 운전 정보 `34_DrivingInfoLights` · `35_DrivingInfoLaws`
| 버튼 | 함수 | 할 일 |
|---|---|---|
| 계기판 경고등 · 교통법규 탭 | `DrivingInfoHead` | (동작함) 두 프레임 사이 이동 |
| 내용 | `mocks/data.ts` | **(데이터)** 출시 전 차량 설명서 · 경찰청 · 도로교통공단 자료로 확인 |
| (들어가는 곳) | — | **(확인 필요)** 이 화면으로 가는 버튼이 디자인에 없어요. 지금은 화면 목록에서만 들어가요 |
