// [프레임] 운전 정보 · 계기판 경고등  |  주소: /driving-info
import { Icon, Screen } from '../../components/ui'
import { DrivingInfoHead } from '../../components/info/DrivingInfoParts'
import { mockWarningLights } from '../../mocks/data'
import './DrivingInfoLightsScreen.css'

const LEVEL_LABEL = { stop: '바로 멈추고 점검', soon: '빨리 점검' } as const

export function DrivingInfoLightsScreen() {
  return (
    <Screen padded>
      <DrivingInfoHead current="lights" />
      <div className="dl-grid">
        {mockWarningLights.map((w) => (
          <article key={w.id} className={`dl-card dl-card--${w.level}`}>
            <div className="dl-card__top">
              <Icon name={w.icon} size={30} strokeWidth={2} />
              <span className="dl-level">{LEVEL_LABEL[w.level]}</span>
            </div>
            <h2>{w.title}</h2>
            <p>{w.desc}</p>
          </article>
        ))}
      </div>
      <p className="hint dl-foot">예시 문구예요. 아이콘은 직접 그린 단순 기호이고, 내용은 차량 설명서 · 도로교통공단 자료로 확인 후 확정해요.</p>
    </Screen>
  )
}
