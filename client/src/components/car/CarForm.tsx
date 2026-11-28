// 내 차 입력 폼 — '내 차 설정', '하이브리드 유종 선택', '내 차 수정' 프레임이 함께 써요.
// mode='new'  : 차종 줄 없음, 평균 연비 카드 청록색
// mode='edit' : 차종 줄 있음, 평균 연비 카드 짙은 초록
import { useState } from 'react'
import { Badge, ChoiceChips, Icon, Select } from '../ui'
import {
  FUELS, HYBRID_FUELS, MANUFACTURERS, MODELS, VEHICLE_TYPES,
  type Fuel, type HybridFuel, type VehicleType,
} from '../../mocks/data'
import './car.css'

export type CarFormValue = {
  vehicleType: VehicleType
  maker: string
  model: string
  /** 아직 안 골랐으면 null */
  fuel: Fuel | null
  hybridFuel: HybridFuel | null
}

export function CarForm({ mode, value, onChange, onOpenHybrid }: {
  mode: 'new' | 'edit'
  value: CarFormValue
  onChange: (v: CarFormValue) => void
  onOpenHybrid: () => void
}) {
  const models = MODELS[value.maker] ?? []
  const model = models.find((m) => m.value === value.model)
  const set = <K extends keyof CarFormValue>(k: K, v: CarFormValue[K]) => onChange({ ...value, [k]: v })
  const hybridLabel = value.fuel === 'hybrid' && value.hybridFuel
    ? `하이브리드 · ${HYBRID_FUELS.find((h) => h.value === value.hybridFuel)!.short}`
    : '하이브리드'

  // TODO(기능): 제조사를 바꾸면 모델 목록을 서버(공공데이터)에서 다시 불러오기
  const handleMakerChange = (maker: string) => onChange({ ...value, maker, model: MODELS[maker]?.[0]?.value ?? '' })

  // 하이브리드를 누르면 유종 선택 시트를 열어요
  const handleFuelChange = (fuel: Fuel) => (fuel === 'hybrid' ? onOpenHybrid() : onChange({ ...value, fuel, hybridFuel: null }))

  return (
    <>
      <h2 className="page-title" style={{ marginTop: 8 }}>어떤 차를 타세요?</h2>
      <p className="page-desc">연비 계산과 코칭 타이밍, 통행료 계산에 쓰여요.</p>

      {mode === 'edit' && (
        <div style={{ marginTop: 20 }}>
          <p className="field-label">차종</p>
          <ChoiceChips options={VEHICLE_TYPES} value={value.vehicleType} onChange={(v) => set('vehicleType', v)} />
        </div>
      )}

      <div className="select-row" style={{ marginTop: mode === 'edit' ? 16 : 24 }}>
        <div style={{ flex: 1 }}>
          <Select label="제조사" value={value.maker} options={MANUFACTURERS} onChange={handleMakerChange} />
        </div>
        <div style={{ flex: 1 }}>
          <Select label="모델" value={value.model} options={models} onChange={(v) => set('model', v)} />
        </div>
      </div>

      {model && (
        <div className={`fuel-card ${mode === 'new' ? 'fuel-card--teal' : ''}`}>
          <div className="fuel-card__label">
            이 차의 평균 연비 <Badge tone="dark">공공데이터</Badge>
          </div>
          <div className="fuel-card__value">
            {model.avgKmL}
            <small>km/L</small>
          </div>
        </div>
      )}

      <div style={{ marginTop: mode === 'new' ? 48 : 16 }}>
        <p className="field-label">연료</p>
        <ChoiceChips
          fit
          nowrap
          value={value.fuel}
          onChange={handleFuelChange}
          options={FUELS.map((f) =>
            f.value === 'hybrid'
              ? { ...f, label: hybridLabel, trailing: value.fuel === 'hybrid' ? undefined : <Icon name="chevronDown" size={16} /> }
              : f,
          )}
        />
        <p className="hint" style={{ marginTop: 8 }}>
          하이브리드를 고르면 유종을 한 번 더 선택해요 · 전기차는 아직 지원하지 않아요
        </p>
      </div>

      {model && (
        <div className="toll-card">
          <span className="toll-card__class">1종</span>
          <div>
            <b>고속도로 통행료 {model.tollClass}</b>
            <p>경로 안내 때 이 기준으로 통행료를 보여줘요</p>
          </div>
        </div>
      )}
    </>
  )
}

/* ---------------- 처음 설정 중인 값 임시 보관 ----------------
   '내 차 설정' ↔ '하이브리드 유종 선택' 프레임을 오가도 고른 값이 남아 있도록
   화면 밖(모듈)에 보관해요.
   TODO(데이터): 나중에 전역 상태(Context, Zustand 등)로 옮겨도 돼요. */
let carDraft: CarFormValue = {
  vehicleType: 'sedan',
  maker: 'hyundai',
  model: 'avante-cn7-26',
  fuel: null,
  hybridFuel: null,
}

export function useCarDraft() {
  const [value, setValue] = useState(carDraft)
  const update = (next: CarFormValue) => {
    carDraft = next
    setValue(next)
  }
  return [value, update] as const
}
