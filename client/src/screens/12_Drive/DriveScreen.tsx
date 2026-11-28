// [프레임] 주행 (기본)  |  주소: /drive
// 주행 프레임 5개가 이 화면을 바탕으로 써요.
//   코칭 강조   → DriveCoachEmphasisScreen.tsx  (emphasis="coach")
//   길안내 강조 → DriveGuideEmphasisScreen.tsx  (emphasis="guide")
//   다른 경로   → DriveRoutesSheetScreen.tsx    (scene="turn" + 시트)
//   소리 설정   → DriveSoundSheetScreen.tsx     (scene="turn" + 시트)
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CoachingCard, DriveBottomBar, HipassChip, LocateButton, MutedBar, NavArrow, NavCard, SpeedSign, useCoachVoice,
} from '../../components/drive/DriveParts'
import { MapView } from '../../components/map/MapView'
import { mockDestination, mockGuidance, mockHipass, mockSpeed } from '../../mocks/data'
import './DriveScreen.css'

export type DriveScreenProps = {
  /** 지도 강조: coach = 코칭(초록), guide = 길안내(빨강) */
  emphasis?: 'none' | 'coach' | 'guide'
  /** ic = 천안IC 안내 + 코칭 카드 / turn = 우회전 안내(코칭 카드 없음) */
  scene?: 'ic' | 'turn'
  /** 위에 덮을 시트 */
  children?: ReactNode
}

export function DriveScreen({ emphasis = 'none', scene = 'ic', children }: DriveScreenProps) {
  const navigate = useNavigate()
  const turnScene = scene === 'turn'
  const guidance = turnScene ? mockGuidance.right : mockGuidance.ic
  // TODO(데이터): 음소거 상태를 전역 상태로 옮기면 프레임을 오가도 유지돼요
  const voice = useCoachVoice(true)

  // TODO(기능): 현재 위치 기준으로 경로 다시 검색
  const handleReroute = () => {}
  // TODO(기능): 지도를 내 위치·진행 방향으로 다시 맞추기
  const handleLocate = () => {}
  // TODO(확인 필요): 메뉴에서 '다른 경로'와 '소리 설정' 중 무엇을 열지 — 지금은 다른 경로
  const handleMenu = () => navigate('/drive/routes')
  // TODO(기능): 목적지에 가까워지면(예: 30m 이내) 이 함수를 불러 도착 화면으로 이동
  const handleArrive = () => navigate('/drive/arrive')
  void handleArrive
  // TODO(기능): 코칭 알림이 오면 emphasis='coach', 회전 직전이면 emphasis='guide'로 바꿔 강조

  // 화면 위쪽 여백 + px
  const top = (px: number) => `calc(env(safe-area-inset-top) + ${px}px)`
  const speedTop = turnScene ? 140 : 276

  return (
    <main className="screen screen--map">
      <MapView emphasis={emphasis}>
        {/* 경로 선 + 내 차 화살표 */}
        <span className="map-route" style={{ left: '50%', top: top(170), bottom: 200 }} />
        <span className="map-arrow" style={{ left: '50%', bottom: 132 }}>
          <NavArrow />
        </span>
      </MapView>

      <NavCard {...guidance} />

      {!turnScene &&
        (voice.on ? (
          <CoachingCard
            distance="300m"
            target="앞 단속카메라"
            message="지금 가속 페달에서 발을 떼세요"
            nextHint="다음 코칭 · 교차로 800m"
            onSwipeUp={voice.mute}
          />
        ) : (
          <div className="drive-muted">
            <MutedBar onPullDown={voice.unmute} />
          </div>
        ))}

      <div style={{ position: 'absolute', top: top(speedTop), left: 0 }}>
        <SpeedSign limit={mockSpeed.limit} current={mockSpeed.current} />
      </div>
      {!turnScene && (
        <div style={{ position: 'absolute', left: 122, top: top(speedTop + 23) }}>
          <HipassChip label={mockHipass.label} fee={mockHipass.fee} />
        </div>
      )}

      <LocateButton onClick={handleLocate} style={{ right: 10, bottom: 'calc(84px + env(safe-area-inset-bottom))' }} />

      <DriveBottomBar
        destName={mockDestination.name}
        destArea={mockDestination.area}
        arrive={mockDestination.arrive}
        remainKm={mockDestination.remainKm}
        onRefresh={handleReroute}
        onMenu={handleMenu}
      />

      {/* 시트 프레임(다른 경로 · 소리 설정)에서 위에 덮는 자리 */}
      {children}
    </main>
  )
}
