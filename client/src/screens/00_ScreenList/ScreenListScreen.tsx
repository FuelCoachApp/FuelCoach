// 화면 목록 (ScreenListScreen) — 개발 중에 모든 화면으로 바로 가는 시작 페이지
// 앱을 출시할 때는 App.tsx에서 '/' 경로를 로그인이나 메인으로 바꿔주세요.
import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui'
import './ScreenListScreen.css'

// 화면 파일 → 폴더 이름
const FOLDERS: Record<string, string> = {
  ScreenListScreen: '00_ScreenList',
  SignupScreen: '01_Signup',
  FindIdScreen: '02_FindId',
  FindPasswordScreen: '03_FindPassword',
  CarPresetScreen: '04_CarPreset',
  CarPresetHybridScreen: '05_CarPresetHybrid',
  CarEditScreen: '06_CarEdit',
  MainScreen: '07_Main',
  FavoritesScreen: '08_Favorites',
  PlaceRegisterScreen: '09_PlaceRegister',
  VehicleSelectScreen: '10_VehicleSelect',
  DepartureTimeScreen: '11_DepartureTime',
  DriveScreen: '12_Drive',
  DriveCoachEmphasisScreen: '13_DriveCoachEmphasis',
  DriveGuideEmphasisScreen: '14_DriveGuideEmphasis',
  DriveRoutesSheetScreen: '15_DriveRoutesSheet',
  DriveSoundSheetScreen: '16_DriveSoundSheet',
  SafeDriveScreen: '17_SafeDrive',
  ArriveScreen: '18_Arrive',
  SettingsScreen: '19_Settings',
  CoachingCatalogScreen: '20_CoachingCatalog',
  SplashScreen: '21_Splash',
  LoginScreen: '22_Login',
  Guide1Screen: '23_Guide1',
  Guide2Screen: '24_Guide2',
  Guide3Screen: '25_Guide3',
  Guide4Screen: '26_Guide4',
  SearchScreen: '27_Search',
  RouteRecommendScreen: '28_RouteRecommend',
  RouteFavoriteSheetScreen: '29_RouteFavoriteSheet',
  ReportScreen: '30_Report',
  MyPageScreen: '31_MyPage',
  CarManageScreen: '32_CarManage',
  NoticesScreen: '33_Notices',
  DrivingInfoLightsScreen: '34_DrivingInfoLights',
  DrivingInfoLawsScreen: '35_DrivingInfoLaws',
  ComingSoonScreen: '99_ComingSoon',
}

export const SCREEN_GROUPS: { group: string; items: { label: string; path: string; file: string }[] }[] = [
  {
    group: '시작 · 계정',
    items: [
      { label: '로딩 화면', path: '/splash', file: 'SplashScreen' },
      { label: '로그인', path: '/login', file: 'LoginScreen' },
      { label: '회원가입', path: '/signup', file: 'SignupScreen' },
      { label: '아이디 찾기', path: '/find-id', file: 'FindIdScreen' },
      { label: '비밀번호 찾기', path: '/find-password', file: 'FindPasswordScreen' },
    ],
  },
  {
    group: '사용 가이드',
    items: [
      { label: '사용 가이드 1/4 · 음성 코칭', path: '/guide/1', file: 'Guide1Screen' },
      { label: '사용 가이드 2/4 · 탄력주행', path: '/guide/2', file: 'Guide2Screen' },
      { label: '사용 가이드 3/4 · 퓨얼컷', path: '/guide/3', file: 'Guide3Screen' },
      { label: '사용 가이드 4/4 · 리포트', path: '/guide/4', file: 'Guide4Screen' },
    ],
  },
  {
    group: '내 차',
    items: [
      { label: '내 차 설정', path: '/car/new', file: 'CarPresetScreen' },
      { label: '내 차 설정 · 하이브리드 유종 선택', path: '/car/new/hybrid', file: 'CarPresetHybridScreen' },
      { label: '내 차 수정', path: '/car/edit', file: 'CarEditScreen' },
      { label: '내 차 관리', path: '/car/manage', file: 'CarManageScreen' },
    ],
  },
  {
    group: '홈 · 검색 · 경로',
    items: [
      { label: '메인', path: '/main', file: 'MainScreen' },
      { label: '목적지 검색', path: '/search', file: 'SearchScreen' },
      { label: '경로 추천', path: '/route', file: 'RouteRecommendScreen' },
      { label: '경로 추천 · 이 경로 즐겨찾기', path: '/route/favorite', file: 'RouteFavoriteSheetScreen' },
      { label: '즐겨찾기 관리', path: '/favorites', file: 'FavoritesScreen' },
      { label: '장소 등록', path: '/places/new', file: 'PlaceRegisterScreen' },
    ],
  },
  {
    group: '주행',
    items: [
      { label: '차량 선택 시트', path: '/drive/vehicle', file: 'VehicleSelectScreen' },
      { label: '출발 시간 추천 시트', path: '/drive/departure', file: 'DepartureTimeScreen' },
      { label: '주행 (기본)', path: '/drive', file: 'DriveScreen' },
      { label: '주행 · 코칭 강조(초록)', path: '/drive/coach', file: 'DriveCoachEmphasisScreen' },
      { label: '주행 · 길안내 강조(빨강)', path: '/drive/guide', file: 'DriveGuideEmphasisScreen' },
      { label: '주행 · 다른 경로 시트', path: '/drive/routes', file: 'DriveRoutesSheetScreen' },
      { label: '주행 · 소리 설정 시트', path: '/drive/sound', file: 'DriveSoundSheetScreen' },
      { label: '안심주행', path: '/drive/safe', file: 'SafeDriveScreen' },
      { label: '도착', path: '/drive/arrive', file: 'ArriveScreen' },
    ],
  },
  {
    group: '리포트 · 나의 정보',
    items: [
      { label: '주행 리포트', path: '/report', file: 'ReportScreen' },
      { label: '나의 정보', path: '/my', file: 'MyPageScreen' },
      { label: '설정', path: '/settings', file: 'SettingsScreen' },
      { label: '공지사항', path: '/notices', file: 'NoticesScreen' },
      { label: '운전 정보 · 계기판 경고등', path: '/driving-info', file: 'DrivingInfoLightsScreen' },
      { label: '운전 정보 · 교통법규', path: '/driving-info/laws', file: 'DrivingInfoLawsScreen' },
    ],
  },
  {
    group: '개발용',
    items: [
      { label: '코칭 알림 종류 (컴포넌트 모음)', path: '/dev/coaching', file: 'CoachingCatalogScreen' },
    ],
  },
]

export function ScreenListScreen() {
  return (
    <main className="screen screen--padded">
      <div className="screen__body" style={{ paddingTop: 28, paddingBottom: 40 }}>
        <p className="section-label">FuelCoach</p>
        <h1 className="page-title" style={{ marginTop: 4 }}>화면 목록</h1>
        <p className="page-desc">와이어프레임 35개 = 폴더 35개예요 (src/screens/01_ ~ 35_). 누르면 해당 화면으로 가요. 각 화면 왼쪽 위 ‹ 버튼이나 브라우저 뒤로 가기로 돌아와요.</p>
        {SCREEN_GROUPS.map((g) => (
          <section key={g.group} style={{ marginTop: 22 }}>
            <p className="section-label" style={{ marginBottom: 8 }}>{g.group}</p>
            <div className="card" style={{ padding: '0 16px' }}>
              {g.items.map((it) => (
                <Link key={it.path} to={it.path} className="list-row">
                  <div className="list-row__body">
                    <div className="list-row__title">{it.label}</div>
                    <div className="list-row__sub">{FOLDERS[it.file]}/ · {it.path}</div>
                  </div>
                  <span className="list-row__trailing"><Icon name="chevron" size={20} /></span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
