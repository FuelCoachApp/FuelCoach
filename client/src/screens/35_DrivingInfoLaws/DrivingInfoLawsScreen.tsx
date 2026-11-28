// [프레임] 운전 정보 · 교통법규  |  주소: /driving-info/laws
import { Icon, InfoNote, Screen } from '../../components/ui'
import { DrivingInfoHead } from '../../components/info/DrivingInfoParts'
import { mockTrafficLaws } from '../../mocks/data'
import './DrivingInfoLawsScreen.css'

export function DrivingInfoLawsScreen() {
  // TODO(데이터): 출시 전 경찰청 · 도로교통공단 자료로 범칙금 · 벌점 다시 확인
  return (
    <Screen padded>
      <DrivingInfoHead current="laws" />
      <div className="lw-list">
        {mockTrafficLaws.map((l) => (
          <article key={l.id} className="lw-card">
            <span className={`lw-icon lw-icon--${l.tone}`}><Icon name={l.icon} size={22} /></span>
            <div className="lw-card__body">
              <h2>
                {l.title}
                {l.soz && <span className="lw-soz">SOZ 코칭 연관</span>}
              </h2>
              <p>{l.desc}</p>
              {l.penalty && <p className="lw-penalty">{l.penalty}</p>}
            </div>
          </article>
        ))}
      </div>
      <div style={{ margin: '12px 2px 32px' }}>
        <InfoNote bare>2026년 11월 기준 · 범칙금과 벌점은 승용차 기준이에요. 법이 바뀔 수 있어 출시 전 경찰청 · 도로교통공단 자료로 다시 확인해요.</InfoNote>
      </div>
    </Screen>
  )
}
