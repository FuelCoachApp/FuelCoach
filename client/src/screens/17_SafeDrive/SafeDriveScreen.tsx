// [프레임] 안심주행  |  주소: /drive/safe — 목적지 없이 코칭만 받으며 달리는 모드
import { useNavigate } from 'react-router-dom'
import { Button, Icon, IconTile } from '../../components/ui'
import { LocateButton, NavArrow, SpeedSign } from '../../components/drive/DriveParts'
import { MapView } from '../../components/map/MapView'
import { mockNextCoaching, mockSpeed } from '../../mocks/data'
import './SafeDriveScreen.css'

export function SafeDriveScreen() {
  const navigate = useNavigate()

  // TODO(기능): 목적지 검색 → 경로 안내로 전환 (주행 기록은 이어서)
  const handleSetDestination = () => navigate('/search')
  // TODO(기능): 주행 종료 확인 → 기록 저장 → 리포트
  const handleEnd = () => navigate('/report')
  // TODO(기능): 지도를 내 위치로 다시 맞추기
  const handleLocate = () => {}

  return (
    <main className="screen screen--map">
      <MapView>
        <span className="map-arrow" style={{ left: '50%', bottom: 140 }}>
          <NavArrow tone="mint" />
        </span>
      </MapView>

      <div className="safe-top">
        <div className="safe-card">
          <IconTile name="shield" size={40} bg="var(--green-card)" />
          <b>안심주행 중</b>
        </div>
        <div className="safe-card safe-card--row">
          <span>다음 코칭</span>
          <b>
            {mockNextCoaching.label} <em>{mockNextCoaching.distance}</em>
          </b>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, top: 'calc(env(safe-area-inset-top) + 154px)' }}>
        <SpeedSign limit={mockSpeed.limit} current={mockSpeed.current} large />
      </div>

      <LocateButton onClick={handleLocate} style={{ right: 14, bottom: 'calc(104px + env(safe-area-inset-bottom))' }} />

      <footer className="safe-bar">
        <Button variant="outline" leading={<Icon name="search" size={18} strokeWidth={2.4} />} onClick={handleSetDestination} style={{ flex: 1 }}>
          목적지 설정
        </Button>
        <Button variant="secondary" onClick={handleEnd} style={{ width: 92 }}>
          주행 종료
        </Button>
      </footer>
    </main>
  )
}
