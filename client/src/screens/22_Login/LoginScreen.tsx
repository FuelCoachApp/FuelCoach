// [프레임] 로그인  |  주소: /login
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '../../components/ui'
import './LoginScreen.css'

type Provider = 'google' | 'kakao' | 'naver'
const SOCIAL: { id: Provider; label: string }[] = [
  { id: 'google', label: 'Google' },
  { id: 'kakao', label: '카카오' },
  { id: 'naver', label: '네이버' },
]

export function LoginScreen() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [loading, setLoading] = useState(false)

  // TODO(기능): 로그인 API 호출 → 토큰 저장 → 메인. 실패하면 입력창 아래 빨간 안내(status="error")
  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => navigate('/main', { replace: true }), 500)
  }
  // TODO(기능): 각 회사 로그인(OAuth) 연결. 로고는 각 회사 가이드라인 버튼 이미지로 바꾸기
  const handleSocialLogin = (_provider: Provider) => {}

  return (
    <main className="screen screen--padded login">
      <div className="screen__body">
        {/* TODO(디자인): 워드마크가 나오면 이 칸에 넣기 (지금은 빈 자리) */}
        <div className="login__wordmark" aria-hidden />

        <TextField label="아이디" placeholder="아이디 또는 이메일" value={id} onChange={setId} autoComplete="username" />
        <TextField label="비밀번호" type="password" placeholder="비밀번호 입력" value={pw} onChange={setPw} autoComplete="current-password" />
        <Button variant="outline-mint" onClick={handleLogin} loading={loading} style={{ marginTop: 18 }}>로그인</Button>

        <div className="login__find">
          <button onClick={() => navigate('/find-id')}>아이디 찾기</button>
          <span aria-hidden />
          <button onClick={() => navigate('/find-password')}>비밀번호 찾기</button>
        </div>

        <div className="login__divider"><span>간편 로그인</span></div>
        <div className="login__social">
          {SOCIAL.map((s) => (
            <button key={s.id} className={`social-btn social-btn--${s.id}`} onClick={() => handleSocialLogin(s.id)}>
              {/* TODO(디자인): 로고 자리 */}
              <span className="social-btn__logo" aria-hidden />
              {s.label}
            </button>
          ))}
        </div>

        <p className="login__join">
          아직 회원이 아니신가요? <button onClick={() => navigate('/signup')}>회원가입</button>
        </p>
      </div>
    </main>
  )
}
