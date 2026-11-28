// [프레임] 비밀번호 찾기  |  주소: /find-password
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Header, Screen, TextField } from '../../components/ui'
import { EmailVerifyFields, FindTabs } from '../../components/account/AccountParts'
import { mockAccount } from '../../mocks/data'

export function FindPasswordScreen() {
  const navigate = useNavigate()
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')

  // TODO(기능): 새 비밀번호 검사(영문+숫자 8자 이상, 두 칸 일치) 후 변경 API 호출 → 로그인 화면
  const handleChangePassword = () => navigate('/login')

  return (
    <Screen padded footer={<Button onClick={handleChangePassword}>비밀번호 변경</Button>}>
      <Header title="비밀번호 찾기" />
      <FindTabs current="password" />
      <div style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 21, fontWeight: 900 }}>새 비밀번호를 정해주세요</h2>
        <p className="page-desc" style={{ marginTop: 4, marginBottom: 18 }}>
          아이디 {mockAccount.maskedId} · 이메일 인증 완료
        </p>
        <EmailVerifyFields />
        <TextField label="새 비밀번호" type="password" placeholder="비밀번호 입력" value={pw} onChange={setPw} help="영문 숫자 포함 8자 이상" autoComplete="new-password" />
        <TextField label="새 비밀번호 확인" type="password" placeholder="한 번 더 입력" value={pw2} onChange={setPw2} autoComplete="new-password" />
      </div>
    </Screen>
  )
}
