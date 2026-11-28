// [프레임] 출발 시간 추천 시트  |  주소: /drive/departure
// ⚠ 디자인에 '확인 필요' 표시가 있는 화면: 카카오 출발 시간 예측 API를 쓸 수 있을 때만 사용
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, BottomSheet, Button, InfoNote } from '../../components/ui'
import { MapView } from '../../components/map/MapView'
import { mockDepartureOptions, mockDestination } from '../../mocks/data'
import './DepartureTimeScreen.css'

const PX_PER_MIN = 6.8 // 막대 높이 = 걸리는 시간(분) × 6.8px

export function DepartureTimeScreen() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('15')
  const fastest = Math.min(...mockDepartureOptions.map((o) => o.minutes))

  // TODO(기능): '지금'이 아니면 출발 알림 예약, '지금'이면 바로 주행 시작
  const handleStart = () => navigate('/drive')

  return (
    <main className="screen screen--map">
      <MapView />
      <BottomSheet backdrop onClose={() => navigate(-1)} label="출발 시간 추천">
        <h2 className="sheet__title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          언제 출발할까요? <Badge tone="orange">확인 필요</Badge>
        </h2>
        <p className="sheet__desc">{mockDestination.name} · 추천 경로 · 출발 시간별 예상</p>

        {/* 출발 시간별 소요 시간 막대그래프 — 가장 빠른 시간을 민트로 강조 */}
        <div className="bars" role="img" aria-label="출발 시간별 예상 소요 시간">
          {mockDepartureOptions.map((o) => (
            <div key={o.id} className="bars__item">
              <span>{o.minutes}분</span>
              <span className={`bars__bar ${o.minutes === fastest ? 'bars__bar--on' : ''}`} style={{ height: o.minutes * PX_PER_MIN }} />
              <span>{o.offset}</span>
            </div>
          ))}
        </div>

        <div role="radiogroup" style={{ marginTop: 14 }}>
          {mockDepartureOptions.slice(0, 3).map((o) => {
            const on = o.id === selected
            return (
              <button key={o.id} role="radio" aria-checked={on} className={`option-card depart-row ${on ? 'option-card--on' : ''}`} onClick={() => setSelected(o.id)}>
                <div>
                  <b>{o.label}</b>
                  <small>{o.depart}</small>
                </div>
                <div>
                  <b>{o.arrive}</b>
                  <small>{o.minutes}분 · 약 {o.cost.toLocaleString()}원</small>
                </div>
                <span className="depart-row__saving">{o.saving > 0 ? `${o.saving}원 절약` : ''}</span>
              </button>
            )
          })}
        </div>

        <div style={{ margin: '14px 0' }}>
          <InfoNote warn>카카오 출발 시간 예측 API를 일반 개발자가 쓸 수 있는지 확인 후 결정 — 안 되면 이 화면은 보류</InfoNote>
        </div>
        <Button onClick={handleStart}>지금 안내 시작</Button>
      </BottomSheet>
    </main>
  )
}
