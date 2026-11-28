// [프레임] 차량 선택 시트  |  주소: /drive/vehicle — 안내 시작 전에 어떤 차로 운전할지 골라요
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, BottomSheet, Button, Icon, IconTile } from '../../components/ui'
import { MapView } from '../../components/map/MapView'
import { mockVehicles } from '../../mocks/data'

export function VehicleSelectScreen() {
  const navigate = useNavigate()
  // 기본값은 본인 차량
  const [selected, setSelected] = useState(mockVehicles.find((v) => v.mine)?.id ?? mockVehicles[0].id)

  // TODO(기능): 임시 차량 입력 시트 열기 (차종·연료만 받고, 기록은 내 차와 따로 저장)
  const handleTempVehicle = () => {}
  // TODO(기능): 고른 차량 id를 주행 세션에 저장 → 안내 시작
  const handleStart = () => navigate('/drive')

  return (
    <main className="screen screen--map">
      <MapView />
      <BottomSheet backdrop onClose={() => navigate(-1)} label="차량 선택">
        <h2 className="sheet__title">어떤 차로 운전하나요?</h2>
        <p className="sheet__desc">고른 차 기준으로 연비 · 절감액을 따로 계산해요.</p>

        <div role="radiogroup" style={{ marginTop: 18 }}>
          {mockVehicles.map((v) => {
            const on = v.id === selected
            return (
              <button key={v.id} role="radio" aria-checked={on} className={`option-card ${on ? 'option-card--on' : ''}`} onClick={() => setSelected(v.id)}>
                <IconTile name="car" size={44} color="var(--text-2)" bg={on ? 'rgba(0,0,0,0.18)' : 'transparent'} />
                <div className="option-card__body">
                  <div className="option-card__title">
                    {v.name}
                    <Badge tone={v.mine ? 'mint-soft' : 'muted'}>{v.tag}</Badge>
                  </div>
                  <div className="option-card__sub">{v.spec}</div>
                  <div className="option-card__meta">{v.lastUsed}</div>
                </div>
                <span className={`radio ${on ? 'radio--on' : ''}`} aria-hidden />
              </button>
            )
          })}
          <button className="option-card option-card--dashed" onClick={handleTempVehicle}>
            <IconTile name="swap" size={44} color="var(--orange)" bg="rgba(240,168,92,0.12)" />
            <div className="option-card__body">
              <div className="option-card__title">임시 차량으로 운전</div>
              <div className="option-card__sub">렌트카 · 다른 사람 차 — 기록이 내 차와 섞이지 않아요</div>
            </div>
            <Icon name="chevron" size={20} />
          </button>
        </div>

        <p className="hint" style={{ textAlign: 'center', margin: '18px 0 12px' }}>
          기본값은 본인 차량&nbsp;&nbsp; 나의 정보 &gt; 내 차 관리에서 바꿔요
        </p>
        <Button onClick={handleStart}>이 차로 안내 시작</Button>
      </BottomSheet>
    </main>
  )
}
