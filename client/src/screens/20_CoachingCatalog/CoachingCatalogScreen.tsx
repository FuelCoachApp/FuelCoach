// [프레임] 코칭 알림 종류  |  주소: /dev/coaching
// 개발·디자인 확인용 화면이에요. 주행 화면의 코칭 카드 자리에 들어가는 알림을 한눈에 봐요.
import type { ReactNode } from 'react'
import { Badge, Screen } from '../../components/ui'
import { BumpChip, CoachingAlert, MutedBar, StartHint, type CoachingKind } from '../../components/drive/DriveParts'
import './CoachingCatalogScreen.css'

// TODO(데이터): 실제 주행 중에는 길찾기 결과·단속카메라 DB·신호 API에서 이 값을 만들어요
const ALERTS: { title: ReactNode; kind: CoachingKind; value: string; label: string; message: string; note?: string }[] = [
  { title: '단속카메라 (기존)', kind: 'camera', value: '300m', label: '앞 단속카메라', message: '지금 가속 페달에서 발을 떼세요' },
  { title: '톨게이트', kind: 'toll', value: '500m', label: '앞 천안 톨게이트', message: '지금 발을 떼면 연료 없이 감속해요', note: '하이패스 여부(내 차 설정)에 따라 목표 속도가 달라요.' },
  { title: '급커브', kind: 'curve', value: '200m', label: '앞 급커브', message: '미리 발을 떼고 속도를 줄여 주세요' },
  { title: '혼잡 구간', kind: 'congestion', value: '400m', label: '앞 정체 시작', message: '지금 발을 떼고 천천히 다가가세요', note: '길찾기 결과의 구간별 정체 정보 사용 · 몇 분마다 갱신' },
  {
    title: <>빨간불 신호 <Badge tone="dark" style={{ marginLeft: 6 }}>시범</Badge></>,
    kind: 'signal', value: '12초', label: '뒤 빨간불', message: '지금 발을 떼세요',
    note: '감속 안내만 해요. "빨리 지나가세요"는 쓰지 않아요. 데이터가 들어오는 지역에서만.',
  },
]

function Block({ title, children, note }: { title: ReactNode; children: ReactNode; note?: string }) {
  return (
    <section className="catalog__block">
      <h2 className="catalog__title">{title}</h2>
      {children}
      {note && <p className="hint" style={{ marginTop: 8 }}>{note}</p>}
    </section>
  )
}

export function CoachingCatalogScreen() {
  return (
    <Screen padded>
      <div style={{ paddingTop: 24, paddingBottom: 40 }}>
        <p className="section-label">주행 화면 컴포넌트</p>
        <h1 className="page-title" style={{ marginTop: 4 }}>코칭 알림 종류</h1>
        <p className="page-desc">모두 주행 화면 상단 코칭 카드 자리에 들어가요. 강조는 깜빡임 대신 천천히 한두 번 밝아지는 효과.</p>

        <Block title="주행 시작 한 줄 안내 (가이드 4번 대체)">
          <StartHint>"발을 떼세요" 안내가 나오면 가속 페달에서 발을 떼 주세요</StartHint>
        </Block>

        {ALERTS.map((a) => (
          <Block key={a.kind} title={a.title} note={a.note}>
            <CoachingAlert kind={a.kind} value={a.value} label={a.label} message={a.message} />
          </Block>
        ))}

        <Block title="과속방지턱 · 혼잡 (효과음)" note="시속 30km 이상일 때만, 음성 대신 짧은 효과음 + 작은 알림">
          <BumpChip>띵 · 100m 앞 과속방지턱</BumpChip>
        </Block>

        <Block title="스와이프로 음소거한 상태">
          <MutedBar />
        </Block>
      </div>
    </Screen>
  )
}
