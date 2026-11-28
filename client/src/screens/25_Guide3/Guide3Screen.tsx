// [프레임] 사용 가이드 3/4 — 퓨얼컷이란?  |  주소: /guide/3
import { GuideLayout } from '../../components/guide/GuideLayout'
import './Guide3Screen.css'

export function Guide3Screen() {
  return (
    <GuideLayout
      step={3}
      title="퓨얼컷이란?"
      body="D단에서 발을 떼고 주행하면 엔진이 연료 분사를 멈춰요. 주행 중 N단으로 변환하면 오히려 공회전 연료를 사용하는 것이니 기어는 D단을 유지해주세요."
    >
      <p className="g3-label">달리는 중 발을 뗐을 때</p>
      <div className="g3-cards">
        <div className="g3-card g3-card--good">
          <span className="g3-gear">D</span>
          <b className="g3-card__name">기어 D 그대로</b>
          <div className="g3-card__result">
            <span>연료 분사</span>
            <strong>0</strong>
            <em>✓ 퓨얼컷</em>
          </div>
        </div>
        <div className="g3-card g3-card--bad">
          <span className="g3-gear">N</span>
          <b className="g3-card__name">중립으로 바꿈</b>
          <div className="g3-card__result">
            <span>연료 분사</span>
            <strong>공회전만큼</strong>
            <em>✕ 오히려 손해</em>
          </div>
        </div>
      </div>
    </GuideLayout>
  )
}
