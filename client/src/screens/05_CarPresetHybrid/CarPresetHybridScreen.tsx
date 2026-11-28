// [프레임] 내 차 설정 · 하이브리드 유종 선택  |  주소: /car/new/hybrid
// '내 차 설정' 화면 위에 유종 선택 시트가 올라온 상태예요.
// 시트(HybridSheet)는 '내 차 수정' 화면에서도 가져다 써요.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomSheet, Button } from '../../components/ui'
import { useCarDraft } from '../../components/car/CarForm'
import { HYBRID_FUELS, type HybridFuel } from '../../mocks/data'
import { CarPresetScreen } from '../04_CarPreset/CarPresetScreen'
import './CarPresetHybridScreen.css'

/* ---------------- 하이브리드 유종 선택 시트 ---------------- */
type HybridSheetProps = {
  value: HybridFuel | null
  onDone: (v: HybridFuel) => void
  onClose: () => void
}
export function HybridSheet({ value, onDone, onClose }: HybridSheetProps) {
  const [picked, setPicked] = useState<HybridFuel>(value ?? 'gasoline')
  return (
    <BottomSheet backdrop onClose={onClose} label="하이브리드 유종 선택">
      <h2 className="sheet__title" style={{ textAlign: 'center' }}>하이브리드 유종 선택</h2>
      <p className="sheet__desc" style={{ textAlign: 'center' }}>엔진에 쓰는 연료를 골라주세요</p>
      <div className="choice-list" role="radiogroup">
        {HYBRID_FUELS.map((h) => (
          <button
            key={h.value}
            role="radio"
            aria-checked={picked === h.value}
            className={`choice-list__item ${picked === h.value ? 'choice-list__item--on' : ''}`}
            onClick={() => setPicked(h.value)}
          >
            {h.label}
          </button>
        ))}
      </div>
      <Button style={{ marginTop: 44 }} onClick={() => onDone(picked)}>선택 완료</Button>
    </BottomSheet>
  )
}

/* ---------------- 프레임 ---------------- */
export function CarPresetHybridScreen() {
  const navigate = useNavigate()
  const [value, setValue] = useCarDraft()
  const backToForm = () => navigate('/car/new', { replace: true })

  const handleDone = (h: HybridFuel) => {
    setValue({ ...value, fuel: 'hybrid', hybridFuel: h })
    backToForm()
  }

  return (
    <CarPresetScreen>
      <HybridSheet value={value.hybridFuel} onDone={handleDone} onClose={backToForm} />
    </CarPresetScreen>
  )
}
