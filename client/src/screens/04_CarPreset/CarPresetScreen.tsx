// [프레임] 내 차 설정 — 회원가입 직후  |  주소: /car/new
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Header, Screen } from '../../components/ui'
import { CarForm, useCarDraft } from '../../components/car/CarForm'

/** children: 위에 덮을 시트 (하이브리드 유종 선택 프레임에서 사용) */
export function CarPresetScreen({ children }: { children?: ReactNode }) {
  const navigate = useNavigate()
  const [value, setValue] = useCarDraft()

  // 하이브리드를 누르면 '하이브리드 유종 선택' 프레임으로
  const handleOpenHybrid = () => navigate('/car/new/hybrid')

  // TODO(기능): 연료를 고르지 않았으면 안내, 내 차 정보 서버에 저장 → 메인으로 이동
  const handleNext = () => navigate('/main')

  return (
    <Screen padded footer={<Button onClick={handleNext}>다음</Button>}>
      <Header title="내 차 설정" showBack={false} />
      <CarForm mode="new" value={value} onChange={setValue} onOpenHybrid={handleOpenHybrid} />
      {children}
    </Screen>
  )
}
