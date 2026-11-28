// [프레임] 아이디 찾기  |  주소: /find-id
import { useNavigate } from 'react-router-dom'
import { Button, Header, Screen } from '../../components/ui'
import { EmailVerifyFields, FindTabs } from '../../components/account/AccountParts'
import { mockAccount } from '../../mocks/data'
import './FindIdScreen.css'

export function FindIdScreen() {
  const navigate = useNavigate()
  // TODO(기능): 인증 성공 시 서버에서 받은 아이디로 결과 카드 표시 (지금은 결과가 보이는 상태)
  const result = mockAccount

  // TODO(기능): 로그인 화면 디자인이 나오면 연결 (지금은 '준비 중' 화면)
  const handleGoLogin = () => navigate('/login')

  return (
    <Screen padded footer={<Button onClick={handleGoLogin}>로그인하기</Button>}>
      <Header title="아이디 찾기" />
      <FindTabs current="id" />
      <div style={{ marginTop: 22 }}>
        <EmailVerifyFields />
        {result && (
          <div className="result-card" aria-live="polite">
            <p>회원님의 아이디는</p>
            <strong>{result.maskedId}</strong>
            <span>{result.joinedAt} 가입</span>
          </div>
        )}
      </div>
    </Screen>
  )
}
