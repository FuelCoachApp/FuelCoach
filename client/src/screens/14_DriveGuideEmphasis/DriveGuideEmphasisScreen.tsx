// [프레임] 주행 · 길안내 강조 (지도 빨강)  |  주소: /drive/guide
// 회전·차선 변경 직전처럼 길안내를 놓치면 안 될 때 지도를 천천히 두 번 빨갛게 밝혀요.
// 실제 앱에서는 주행 화면이 그대로 있고 강조만 켜져요 → DriveScreen의 emphasis 값만 바꾸면 돼요.
import { DriveScreen } from '../12_Drive/DriveScreen'

export function DriveGuideEmphasisScreen() {
  return <DriveScreen emphasis="guide" />
}
