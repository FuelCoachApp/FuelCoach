// 아직 디자인이 없는 화면 자리 — 없는 주소로 가면 이 화면이 보여요
import { useNavigate } from 'react-router-dom'
import { Button, Header, Screen } from '../../components/ui'

export function ComingSoonScreen() {
  const navigate = useNavigate()
  return (
    <Screen padded>
      <Header title="준비 중" />
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <p className="page-title" style={{ fontSize: 20 }}>아직 디자인이 없어요</p>
          <p className="page-desc" style={{ marginTop: 6 }}>프레임을 만들면 src/screens에 폴더를 추가해 주세요.</p>
          <Button variant="secondary" size="sm" onClick={() => navigate('/')} style={{ marginTop: 20, width: 160 }}>
            화면 목록으로
          </Button>
        </div>
      </div>
    </Screen>
  )
}
