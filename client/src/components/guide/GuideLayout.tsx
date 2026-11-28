// 사용 가이드 4장(23~26번 프레임)이 함께 쓰는 틀
// 위: '사용 가이드 n/4' + 건너뛰기 / 가운데: 그림 카드 / 아래: 제목·설명·점·버튼
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Screen } from '../ui'
import './guide.css'

export const GUIDE_TOTAL = 4

type Props = {
  step: number
  title: ReactNode
  body: ReactNode
  /** 가운데 그림 카드 안에 들어갈 내용 */
  children: ReactNode
}

export function GuideLayout({ step, title, body, children }: Props) {
  const navigate = useNavigate()
  const isLast = step === GUIDE_TOTAL

  // TODO(기능): 가이드를 본 적 있다고 기기에 저장해서, 다음 실행부터는 바로 메인으로
  const finishGuide = () => navigate('/main', { replace: true })
  const handleSkip = () => finishGuide()
  const handleNext = () => (isLast ? finishGuide() : navigate(`/guide/${step + 1}`, { replace: true }))

  return (
    <Screen
      padded
      footer={
        <>
          <div className="guide-dots" aria-label={`${GUIDE_TOTAL}장 중 ${step}장`}>
            {Array.from({ length: GUIDE_TOTAL }, (_, i) => (
              <span key={i} className={`guide-dots__dot ${i + 1 === step ? 'guide-dots__dot--on' : ''}`} />
            ))}
          </div>
          <Button variant="outline-mint" onClick={handleNext}>{isLast ? '시작하기' : '다음'}</Button>
        </>
      }
    >
      <header className="guide-head">
        <b>사용 가이드 {step}/{GUIDE_TOTAL}</b>
        <button onClick={handleSkip}>건너뛰기</button>
      </header>
      <div className="guide-art">{children}</div>
      <h1 className="guide-title">{title}</h1>
      <p className="guide-body">{body}</p>
    </Screen>
  )
}
