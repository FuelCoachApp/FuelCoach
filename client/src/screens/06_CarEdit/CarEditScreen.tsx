// [프레임] 내 차 수정 — 나의 정보 > 내 차 관리  |  주소: /car/edit
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Header, Screen } from '../../components/ui'
import { CarForm, type CarFormValue } from '../../components/car/CarForm'
import type { HybridFuel } from '../../mocks/data'
import { HybridSheet } from '../05_CarPresetHybrid/CarPresetHybridScreen'

export function CarEditScreen() {
  const navigate = useNavigate()
  // TODO(데이터): 서버에 저장된 내 차 정보로 초기값 채우기
  const [value, setValue] = useState<CarFormValue>({
    vehicleType: 'sedan', maker: 'hyundai', model: 'avante-cn7', fuel: 'hybrid', hybridFuel: 'gasoline',
  })
  const [hybridOpen, setHybridOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleHybridDone = (h: HybridFuel) => {
    setValue({ ...value, fuel: 'hybrid', hybridFuel: h })
    setHybridOpen(false)
  }

  // TODO(기능): 수정한 내 차 정보 저장 API 호출 (지금은 0.6초 뒤 뒤로 가기)
  const handleSave = () => {
    setSaving(true)
    setTimeout(() => navigate(-1), 600)
  }

  return (
    <Screen padded footer={<Button onClick={handleSave} loading={saving}>저장</Button>}>
      <Header title="내 차 수정" />
      <CarForm mode="edit" value={value} onChange={setValue} onOpenHybrid={() => setHybridOpen(true)} />
      {hybridOpen && <HybridSheet value={value.hybridFuel} onDone={handleHybridDone} onClose={() => setHybridOpen(false)} />}
    </Screen>
  )
}
