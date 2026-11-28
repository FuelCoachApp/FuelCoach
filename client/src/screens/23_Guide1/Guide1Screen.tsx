// [프레임] 사용 가이드 1/4 — 주행 중 음성 코칭  |  주소: /guide/1
import { GuideLayout } from '../../components/guide/GuideLayout'
import './Guide1Screen.css'

export function Guide1Screen() {
  return (
    <GuideLayout
      step={1}
      title={'주행 중에\n음성으로 코칭해요'}
      body="단속카메라, 교차로, 내리막처럼 속도를 줄여야 하는 곳 전에 언제 가속 페달에서 발을 떼면 좋을지 미리 알려드려요."
    >
      {/* 주행 화면의 코칭 카드 모양 미리보기 */}
      <div className="g1-card">
        <div className="g1-card__top">
          <span className="g1-badge">탄력주행 코칭</span>
          <span className="g1-badge">다음 코칭 · <b>교차로 800m</b></span>
        </div>
        <div className="g1-card__distance">
          300m<small>앞 단속카메라</small>
        </div>
        <div className="g1-card__message">지금 가속 페달에서 발을 떼세요</div>
      </div>
      <div className="g1-chips">
        <span>단속카메라</span>
        <span>교차로 · 제한속도</span>
        <span>내리막 경사</span>
      </div>
    </GuideLayout>
  )
}
