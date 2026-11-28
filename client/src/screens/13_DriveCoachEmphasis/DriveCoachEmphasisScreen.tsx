// [프레임] 주행 · 코칭 강조 (지도 초록)  |  주소: /drive/coach
// 탄력주행 코칭 알림이 나올 때 지도를 천천히 두 번 초록으로 밝혀 주의를 끌어요.
// 실제 앱에서는 주행 화면이 그대로 있고 강조만 켜져요 → DriveScreen의 emphasis 값만 바꾸면 돼요.
import { DriveScreen } from '../12_Drive/DriveScreen'

export function DriveCoachEmphasisScreen() {
  return <DriveScreen emphasis="coach" />
}
