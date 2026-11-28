// [프레임] 사용 가이드 4/4 — 주행 리포트  |  주소: /guide/4
import { GuideLayout } from '../../components/guide/GuideLayout'
import './Guide4Screen.css'

// 그래프 점 (카드 안 좌표). TODO(데이터): 실제 기록이 생기면 최근 에코 점수로 그려도 돼요
const TREND = [[21.5, 283.5], [71.5, 275.5], [120.5, 279.5], [170.5, 261.5], [220.5, 255.5], [270.5, 247.5], [325, 239.5]]

export function Guide4Screen() {
  return (
    <GuideLayout
      step={4}
      title={'주행이 끝나면\n리포트로 확인해요'}
      body="에코 점수와 절약된 연료, 절감된 금액을 보여줘요. 같은 경로로 다시 주행하면 지난번 주행보다 얼마나 향상됐는지도 알려드려요."
    >
      <div className="g4">
        <div className="g4__head">
          <span>에코 점수</span>
          <span className="g4__badge">같은 경로 지난번보다 +6점</span>
        </div>
        <div className="g4__score">
          85<small>/ 100점</small>
        </div>
        <div className="g4__tiles">
          <div><span>추정 연비</span><b>13.2<small>km/L</small></b></div>
          <div><span>절감 금액</span><b className="g4__mint">약 68<small>원</small></b></div>
          <div><span>절감 연료</span><b className="g4__mint">0.04<small>L</small></b></div>
        </div>
      </div>
      <svg className="g4__chart" viewBox="0 0 347 336" width="100%" height="100%" aria-hidden>
        <polyline points={TREND.map((p) => p.join(',')).join(' ')} fill="none" stroke="var(--mint)" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    </GuideLayout>
  )
}
