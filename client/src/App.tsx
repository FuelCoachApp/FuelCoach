// 주소(경로) ↔ 화면 연결표 — 와이어프레임 1개 = 폴더 1개 = 주소 1개
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ScreenListScreen } from './screens/00_ScreenList/ScreenListScreen'
import { ComingSoonScreen } from './screens/99_ComingSoon/ComingSoonScreen'
import { SignupScreen } from './screens/01_Signup/SignupScreen'
import { FindIdScreen } from './screens/02_FindId/FindIdScreen'
import { FindPasswordScreen } from './screens/03_FindPassword/FindPasswordScreen'
import { CarPresetScreen } from './screens/04_CarPreset/CarPresetScreen'
import { CarPresetHybridScreen } from './screens/05_CarPresetHybrid/CarPresetHybridScreen'
import { CarEditScreen } from './screens/06_CarEdit/CarEditScreen'
import { MainScreen } from './screens/07_Main/MainScreen'
import { FavoritesScreen } from './screens/08_Favorites/FavoritesScreen'
import { PlaceRegisterScreen } from './screens/09_PlaceRegister/PlaceRegisterScreen'
import { VehicleSelectScreen } from './screens/10_VehicleSelect/VehicleSelectScreen'
import { DepartureTimeScreen } from './screens/11_DepartureTime/DepartureTimeScreen'
import { DriveScreen } from './screens/12_Drive/DriveScreen'
import { DriveCoachEmphasisScreen } from './screens/13_DriveCoachEmphasis/DriveCoachEmphasisScreen'
import { DriveGuideEmphasisScreen } from './screens/14_DriveGuideEmphasis/DriveGuideEmphasisScreen'
import { DriveRoutesSheetScreen } from './screens/15_DriveRoutesSheet/DriveRoutesSheetScreen'
import { DriveSoundSheetScreen } from './screens/16_DriveSoundSheet/DriveSoundSheetScreen'
import { SafeDriveScreen } from './screens/17_SafeDrive/SafeDriveScreen'
import { ArriveScreen } from './screens/18_Arrive/ArriveScreen'
import { SettingsScreen } from './screens/19_Settings/SettingsScreen'
import { CoachingCatalogScreen } from './screens/20_CoachingCatalog/CoachingCatalogScreen'

import { SplashScreen } from './screens/21_Splash/SplashScreen'
import { LoginScreen } from './screens/22_Login/LoginScreen'
import { Guide1Screen } from './screens/23_Guide1/Guide1Screen'
import { Guide2Screen } from './screens/24_Guide2/Guide2Screen'
import { Guide3Screen } from './screens/25_Guide3/Guide3Screen'
import { Guide4Screen } from './screens/26_Guide4/Guide4Screen'
import { SearchScreen } from './screens/27_Search/SearchScreen'
import { RouteRecommendScreen } from './screens/28_RouteRecommend/RouteRecommendScreen'
import { RouteFavoriteSheetScreen } from './screens/29_RouteFavoriteSheet/RouteFavoriteSheetScreen'
import { ReportScreen } from './screens/30_Report/ReportScreen'
import { MyPageScreen } from './screens/31_MyPage/MyPageScreen'
import { CarManageScreen } from './screens/32_CarManage/CarManageScreen'
import { NoticesScreen } from './screens/33_Notices/NoticesScreen'
import { DrivingInfoLightsScreen } from './screens/34_DrivingInfoLights/DrivingInfoLightsScreen'
import { DrivingInfoLawsScreen } from './screens/35_DrivingInfoLaws/DrivingInfoLawsScreen'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 앱 시작: 로딩 화면 → 로그인 → 메인 */}
        <Route path="/" element={<Navigate to="/splash" replace />} />
        {/* 개발용 화면 목록 */}
        <Route path="/dev" element={<ScreenListScreen />} />

        {/* 시작 · 계정 */}
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/find-id" element={<FindIdScreen />} />
        <Route path="/find-password" element={<FindPasswordScreen />} />

        {/* 내 차 */}
        <Route path="/car/new" element={<CarPresetScreen />} />
        <Route path="/car/new/hybrid" element={<CarPresetHybridScreen />} />
        <Route path="/car/edit" element={<CarEditScreen />} />
        <Route path="/car/manage" element={<CarManageScreen />} />

        {/* 사용 가이드 */}
        <Route path="/guide/1" element={<Guide1Screen />} />
        <Route path="/guide/2" element={<Guide2Screen />} />
        <Route path="/guide/3" element={<Guide3Screen />} />
        <Route path="/guide/4" element={<Guide4Screen />} />

        {/* 홈 · 장소 */}
        <Route path="/main" element={<MainScreen />} />
        <Route path="/favorites" element={<FavoritesScreen />} />
        <Route path="/places/new" element={<PlaceRegisterScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/route" element={<RouteRecommendScreen />} />
        <Route path="/route/favorite" element={<RouteFavoriteSheetScreen />} />

        {/* 주행 */}
        <Route path="/drive/vehicle" element={<VehicleSelectScreen />} />
        <Route path="/drive/departure" element={<DepartureTimeScreen />} />
        <Route path="/drive" element={<DriveScreen />} />
        <Route path="/drive/coach" element={<DriveCoachEmphasisScreen />} />
        <Route path="/drive/guide" element={<DriveGuideEmphasisScreen />} />
        <Route path="/drive/routes" element={<DriveRoutesSheetScreen />} />
        <Route path="/drive/sound" element={<DriveSoundSheetScreen />} />
        <Route path="/drive/safe" element={<SafeDriveScreen />} />
        <Route path="/drive/arrive" element={<ArriveScreen />} />

        {/* 기타 */}
        <Route path="/report" element={<ReportScreen />} />
        <Route path="/my" element={<MyPageScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/notices" element={<NoticesScreen />} />
        <Route path="/driving-info" element={<DrivingInfoLightsScreen />} />
        <Route path="/driving-info/laws" element={<DrivingInfoLawsScreen />} />
        <Route path="/dev/coaching" element={<CoachingCatalogScreen />} />


        {/* 없는 주소 → '준비 중' 화면 */}
        <Route path="*" element={<ComingSoonScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
