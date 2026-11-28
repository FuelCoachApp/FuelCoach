// [프레임] 사용 가이드 2/4 — 탄력주행이란?  |  주소: /guide/2
// 그래프는 SVG로 직접 그렸어요 (가로 347 × 세로 336 기준, 카드 폭에 맞춰 늘어나요)
import { GuideLayout } from '../../components/guide/GuideLayout'

export function Guide2Screen() {
  return (
    <GuideLayout
      step={2}
      title="탄력주행이란?"
      body="가속 페달에서 발을 떼고, 차가 주행 중이던 속도로 주행되게 하는 운전이에요. 미리 발을 떼면 브레이크를 덜 밟고, 연료도 절약되요."
    >
      <svg viewBox="0 0 347 336" width="100%" height="100%" role="img" aria-label="미리 발을 떼면 천천히 감속하고, 늦게 브레이크를 밟으면 교차로 직전에 급하게 감속하는 그래프">
        {/* 범례 */}
        <path d="M21 30h16" stroke="var(--mint)" strokeWidth="3" />
        <text x="44" y="34.5" fontSize="12" fill="var(--text-2)">미리 발 떼기</text>
        <path d="M119 30h16" stroke="var(--text-3)" strokeWidth="3" strokeDasharray="5 4" />
        <text x="141" y="34.5" fontSize="12" fill="var(--text-2)">늦게 브레이크</text>

        {/* 축 */}
        <text x="24" y="65" fontSize="10.5" fill="var(--text-3)">속도</text>
        <path d="M35 74v207h290" stroke="var(--muted)" strokeWidth="1.5" fill="none" />
        <text x="326" y="301" fontSize="10.5" fill="var(--text-3)" textAnchor="end">거리</text>

        {/* 교차로 */}
        <path d="M295 92v189" stroke="var(--text)" strokeWidth="2" />
        <text x="295" y="83" fontSize="12" fontWeight="800" fill="var(--text)" textAnchor="middle">교차로</text>

        {/* 늦게 브레이크(점선) */}
        <path d="M122 121H255C268 121 281 150 294 270" stroke="var(--text-3)" strokeWidth="2.5" strokeDasharray="6 5" fill="none" />
        {/* 미리 발 떼기(실선) */}
        <path d="M35 121H122C160 121 200 160 292 268" stroke="var(--mint)" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* 발 떼는 지점 */}
        <path d="M122.5 128v153" stroke="var(--mint)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="122.5" cy="121" r="6" fill="var(--bg)" stroke="var(--mint)" strokeWidth="2.5" />
        <rect x="79" y="86" width="87" height="21" rx="10.5" fill="var(--mint)" />
        <text x="122.5" y="100.5" fontSize="11" fontWeight="800" fill="var(--on-mint)" textAnchor="middle">여기서 발 떼기</text>
        <text x="122.5" y="299" fontSize="11.5" fontWeight="800" fill="var(--text)" textAnchor="middle">음성 안내</text>
      </svg>
    </GuideLayout>
  )
}
