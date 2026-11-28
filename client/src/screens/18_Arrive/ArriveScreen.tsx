// [프레임] 도착  |  주소: /drive/arrive — 10초 뒤 리포트로 자동 이동
import { useNavigate } from 'react-router-dom'
import { BottomSheet, Button, Icon } from '../../components/ui'
import { MapView } from '../../components/map/MapView'
import { useCountdown } from '../../hooks/useCountdown'
import { mockDestination, mockTripSummary } from '../../mocks/data'
import './ArriveScreen.css'

const AUTO_SECONDS = 10

/** 남은 초를 보여주는 작은 원형 타이머 */
function CountdownRing({ left, total }: { left: number; total: number }) {
  const r = 11
  const c = 2 * Math.PI * r
  return (
    <svg className="ring" width="28" height="28" viewBox="0 0 28 28" aria-label={`${left}초 뒤 이동`}>
      <circle cx="14" cy="14" r={r} fill="none" stroke="var(--muted)" strokeWidth="2.5" />
      <circle
        cx="14" cy="14" r={r} fill="none" stroke="var(--text)" strokeWidth="2.5"
        strokeDasharray={c} strokeDashoffset={c * (1 - left / total)} strokeLinecap="round"
        transform="rotate(-90 14 14)" style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
      <text x="14" y="18.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text)">{left}</text>
    </svg>
  )
}

export function ArriveScreen() {
  const navigate = useNavigate()
  // TODO(기능): 설정의 '도착하면 리포트로 자동 이동'이 꺼져 있으면 타이머를 돌리지 않기
  const goReport = () => navigate('/report')
  const timer = useCountdown(AUTO_SECONDS, true, goReport)

  // TODO(기능): 주행 기록 저장 API 호출 후 리포트로 이동
  const handleEnd = () => goReport()
  // TODO(기능): 안심주행 모드로 이어서 주행
  const handleContinue = () => navigate('/drive/safe')

  return (
    <main className="screen screen--map">
      <MapView plain>
        <span className="map-pin" style={{ left: '84%', top: '30%', color: 'var(--blue)' }}>
          <Icon name="pin" size={36} strokeWidth={2.2} />
        </span>
      </MapView>
      <BottomSheet flat handle={false} label="도착">
        <div className="arrive-head">
          <span className="arrive-head__icon"><Icon name="check" size={22} strokeWidth={3} /></span>
          <div>
            <h2>목적지에 도착했어요</h2>
            <p>
              <b>{mockDestination.name}</b> {mockDestination.area} · {mockDestination.arrive}
            </p>
          </div>
        </div>
        <div className="stat-tiles">
          <div className="stat-tile"><span>주행 시간</span><b>{mockTripSummary.duration}</b></div>
          <div className="stat-tile"><span>거리</span><b>{mockTripSummary.distance}</b></div>
          <div className="stat-tile"><span>절감금액 (추정)</span><b>{mockTripSummary.saving}</b></div>
        </div>
        <p className="hint" style={{ margin: '16px 0 14px' }}>안전한 곳에 멈춘 뒤 확인하세요. 10초 뒤 리포트로 넘어가요.</p>
        <Button onClick={handleEnd} trailing={<CountdownRing left={timer.left} total={AUTO_SECONDS} />}>주행 종료</Button>
        <Button variant="secondary" onClick={handleContinue} style={{ marginTop: 10 }}>계속 주행하기</Button>
      </BottomSheet>
    </main>
  )
}
