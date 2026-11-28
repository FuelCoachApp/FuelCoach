// [프레임] 주행 · 다른 경로 시트  |  주소: /drive/routes
// 주행 화면(우회전 안내 장면) 위에 '다른 경로' 시트가 올라온 상태예요.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomSheet, Button, Icon } from '../../components/ui'
import { mockAltRoutes } from '../../mocks/data'
import { DriveScreen } from '../12_Drive/DriveScreen'
import './DriveRoutesSheetScreen.css'

export function DriveRoutesSheetScreen() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('current')

  const handleClose = () => navigate('/drive', { replace: true })
  // TODO(기능): 고른 경로로 재탐색 후 안내 이어가기
  const handleChange = () => handleClose()

  return (
    <DriveScreen scene="turn">
      <BottomSheet backdrop onClose={handleClose} label="다른 경로">
        <h2 className="sheet__title">다른 경로</h2>
        <p className="sheet__desc">지금 위치에서 갈 수 있는 경로예요</p>
        <div role="radiogroup" style={{ marginTop: 14 }}>
          {mockAltRoutes.map((r) => {
            const on = r.id === selected
            return (
              <button
                key={r.id}
                role="radio"
                aria-checked={on}
                className={`option-card route-option ${on ? 'route-option--on' : ''}`}
                onClick={() => setSelected(r.id)}
              >
                <div className="option-card__body">
                  <div className="route-option__name">{r.name}</div>
                  <div className="route-option__arrive">{r.arrive}</div>
                  {r.detail && <div className="option-card__sub">{r.detail}</div>}
                </div>
                {r.id !== 'current' && <Icon name="chevron" size={20} />}
              </button>
            )
          })}
        </div>
        <Button style={{ marginTop: 34 }} onClick={handleChange}>이 경로로 변경</Button>
      </BottomSheet>
    </DriveScreen>
  )
}
