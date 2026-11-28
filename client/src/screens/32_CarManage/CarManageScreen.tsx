// [프레임] 내 차 관리  |  주소: /car/manage
// 카드를 길게 누르면 본인 차량을 바꿀 수 있어요.
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Header, Icon, InfoNote, Screen } from '../../components/ui'
import { mockManagedCars } from '../../mocks/data'
import './CarManageScreen.css'

const LONG_PRESS_MS = 600

export function CarManageScreen() {
  const navigate = useNavigate()
  // TODO(데이터): 서버의 '본인 차량' 값으로 시작
  const [primaryId, setPrimaryId] = useState(mockManagedCars[0].id)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // TODO(기능): 본인 차량 변경 API 호출 (지금은 화면에서만 바뀌어요)
  const handleSetPrimary = (id: string) => setPrimaryId(id)
  const startPress = (id: string) => {
    timer.current = setTimeout(() => handleSetPrimary(id), LONG_PRESS_MS)
  }
  const cancelPress = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }

  // TODO(기능): 고른 차의 정보를 들고 내 차 수정 화면으로
  const handleEdit = (_id: string) => navigate('/car/edit')
  // TODO(확인 필요): 차량 추가 전용 화면이 디자인에 없어서 지금은 내 차 수정 화면으로 가요
  const handleAdd = () => navigate('/car/edit')

  return (
    <Screen padded>
      <Header title="내 차 관리" />
      <p className="page-desc" style={{ margin: '4px 0 16px' }}>주행을 시작할 때 고른 차 기준으로 기록이 따로 쌓여요.</p>

      {mockManagedCars.map((c) => {
        const primary = c.id === primaryId
        return (
          <section
            key={c.id}
            className={`cm-card ${primary ? 'cm-card--primary' : ''}`}
            onPointerDown={() => startPress(c.id)}
            onPointerUp={cancelPress}
            onPointerLeave={cancelPress}
            onContextMenu={(e) => e.preventDefault()}
            aria-label={`${c.name}${primary ? ', 본인 차량' : ''}`}
          >
            <div className="cm-card__top">
              <span className="cm-card__icon"><Icon name="car" size={22} /></span>
              <div className="cm-card__body">
                <div className="cm-card__name">
                  {c.name}
                  {primary ? <Badge tone="mint-soft">본인 차량</Badge> : c.tag && <Badge tone="muted">{c.tag}</Badge>}
                </div>
                <p>{c.spec}</p>
              </div>
              <button className="cm-card__edit" onClick={() => handleEdit(c.id)} onPointerDown={(e) => e.stopPropagation()}>수정</button>
            </div>
            <div className="cm-card__foot">
              <span>이 차로 {c.km}</span>
              <b>{c.saving}</b>
            </div>
          </section>
        )
      })}

      <button className="cm-add" onClick={handleAdd}>
        <Icon name="plus" size={20} strokeWidth={2.4} />
        차량 추가
      </button>

      <div style={{ margin: '24px 4px 32px' }}>
        <InfoNote bare>본인 차량은 주행 시작 때 기본으로 골라져요. 카드를 길게 눌러 본인 차량을 바꿀 수 있어요.</InfoNote>
      </div>
    </Screen>
  )
}
