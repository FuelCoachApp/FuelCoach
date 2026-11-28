// 아이디 찾기 · 비밀번호 찾기 프레임이 함께 쓰는 부품
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Segmented, TextField } from '../ui'
import { useCountdown } from '../../hooks/useCountdown'

/** 위쪽 탭: 누르면 다른 프레임(주소)으로 바꿔요 */
export function FindTabs({ current }: { current: 'id' | 'password' }) {
  const navigate = useNavigate()
  return (
    <Segmented
      ariaLabel="찾을 항목"
      value={current}
      onChange={(v) => navigate(v === 'id' ? '/find-id' : '/find-password', { replace: true })}
      options={[
        { value: 'id', label: '아이디 찾기' },
        { value: 'password', label: '비밀번호 찾기' },
      ]}
    />
  )
}

/** 이메일 + 인증번호(3:00 타이머) 입력 두 칸 */
export function EmailVerifyFields() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const timer = useCountdown(180)
  // TODO(기능): 이메일 입력 후 인증번호 보내기 버튼(또는 자동 발송) 연결
  return (
    <>
      <TextField label="가입할 때 쓴 이메일" type="email" placeholder="이메일 입력" value={email} onChange={setEmail} />
      <TextField label="인증번호" placeholder="인증번호 입력" value={code} onChange={setCode} trailing={timer.mmss} />
    </>
  )
}
