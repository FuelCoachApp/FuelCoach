// [프레임] 회원가입  |  주소: /signup
// ⚠ 디자인 프레임에는 제출 버튼이 없어서 '가입하고 내 차 설정하기' 버튼을 추가했어요.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Checkbox, Header, InfoNote, Screen, TextField } from '../../components/ui'
import { useCountdown } from '../../hooks/useCountdown'
import './SignupScreen.css'

const TERMS = [
  { id: 'service', required: true, label: '서비스 이용약관' },
  { id: 'privacy', required: true, label: '개인정보 수집·이용' },
  { id: 'location', required: true, label: '위치정보 이용약관' },
  { id: 'marketing', required: false, label: '이벤트·소식 알림' },
]

export function SignupScreen() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nickname: '', id: '', pw: '', pw2: '', email: '', code: '' })
  const [codeSent, setCodeSent] = useState(true) // 디자인 상태 재현용 (인증번호 보낸 뒤)
  const [agreed, setAgreed] = useState<Record<string, boolean>>({ service: true, privacy: true, location: true, marketing: true })
  const timer = useCountdown(180, codeSent)
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }))
  const allAgreed = TERMS.every((t) => agreed[t.id])

  // TODO(기능): 닉네임 중복 확인 API 호출 (2~20자 검사 후)
  const handleCheckNickname = () => {}

  // TODO(기능): 이메일로 인증번호 보내기 API 호출
  const handleSendEmailCode = () => {
    setCodeSent(true)
    timer.reset()
  }

  // TODO(기능): 약관 상세 화면 또는 웹페이지 열기
  const handleOpenTerm = (_id: string) => {}

  // TODO(기능): 입력값 검사(아이디 8~20자, 비밀번호 영문+숫자 8자 이상, 비밀번호 일치, 필수 약관) → 회원가입 API
  const handleSubmit = () => navigate('/car/new')

  return (
    <Screen
      padded
      footer={<Button onClick={handleSubmit}>가입하고 내 차 설정하기</Button>}
    >
      <Header title="회원가입" />
      <div style={{ paddingTop: 4 }}>
        <TextField
          label="닉네임"
          placeholder="ex) 베스트 드라이빌"
          value={form.nickname}
          onChange={set('nickname')}
          help="2~20자 사이"
          addon={{ label: '중복 확인', onClick: handleCheckNickname }}
        />
        <TextField label="아이디" placeholder="아이디 입력" value={form.id} onChange={set('id')} help="8~20자 사이" autoComplete="username" />
        <TextField label="비밀번호" type="password" placeholder="비밀번호 입력" value={form.pw} onChange={set('pw')} help="영문, 숫자 포함 8자 이상" autoComplete="new-password" />
        <TextField label="비밀번호 확인" type="password" placeholder="한 번 더 입력" value={form.pw2} onChange={set('pw2')} autoComplete="new-password" />
        <TextField
          label="이메일"
          type="email"
          placeholder="이메일 입력"
          value={form.email}
          onChange={set('email')}
          addon={{ label: '인증 확인', onClick: handleSendEmailCode, tone: 'neutral' }}
          help={codeSent ? '인증번호를 보냈어요' : undefined}
          status={codeSent ? 'success' : 'default'}
        />
        <TextField label="이메일 인증번호" placeholder="인증번호 입력" value={form.code} onChange={set('code')} trailing={codeSent ? timer.mmss : undefined} />

        <div style={{ marginTop: 24 }}>
          <InfoNote>
            메일이 안 왔다면 스팸함을 확인해 주세요.
            <br />
            휴대폰 인증 대신 이메일 인증만 사용해요.
          </InfoNote>
        </div>

        <Card style={{ marginTop: 24, padding: '14px 16px 8px' }}>
          <div className="terms__all">
            <Checkbox
              checked={allAgreed}
              label="약관 전체 동의"
              onChange={(v) => setAgreed(Object.fromEntries(TERMS.map((t) => [t.id, v])))}
            />
            <b>약관 전체 동의</b>
          </div>
          {TERMS.map((t) => (
            <div key={t.id} className="terms__row">
              <Checkbox checked={!!agreed[t.id]} label={t.label} onChange={(v) => setAgreed((a) => ({ ...a, [t.id]: v }))} />
              <span className={t.required ? 'terms__req' : 'terms__opt'}>{t.required ? '[필수]' : '[선택]'}</span>
              <span className="terms__label">{t.label}</span>
              <button className="terms__view" onClick={() => handleOpenTerm(t.id)}>보기 ›</button>
            </div>
          ))}
        </Card>
      </div>
    </Screen>
  )
}

