// [프레임] 나의 정보 (나의 정보 탭)  |  주소: /my
import { useNavigate } from 'react-router-dom'
import { Icon, TabBar, type IconName } from '../../components/ui'
import { mockFuelPrice, mockMyCar, mockProfile } from '../../mocks/data'
import './MyPageScreen.css'

const MENU: { icon: IconName; label: string; path: string }[] = [
  { icon: 'gear', label: '설정', path: '/settings' },
  { icon: 'star', label: '즐겨찾기 관리', path: '/favorites' },
  { icon: 'clock', label: '사용 가이드 다시 보기', path: '/guide/1' },
  { icon: 'bars', label: '공지사항', path: '/notices' },
]

export function MyPageScreen() {
  const navigate = useNavigate()
  const p = mockProfile
  const car = mockMyCar

  // TODO(기능): 닉네임 · 프로필 수정 (디자인 없음)
  const handleEditProfile = () => {}
  // TODO(기능): 유가 기준 바꾸기 — 오피넷 전국 평균 자동 / 직접 입력 (디자인 없음)
  const handleFuelPrice = () => {}

  return (
    <main className="screen screen--padded screen--with-tabbar mypage">
      <div className="screen__body">
        <h1 className="page-title" style={{ margin: '18px 0 14px' }}>나의 정보</h1>

        <section className="mp-card mp-profile">
          <span className="mp-avatar">{p.nickname.slice(0, 1)}</span>
          <div>
            <div className="mp-profile__name">
              {p.nickname}
              <button className="mp-edit" onClick={handleEditProfile}>
                <Icon name="pencil" size={12} strokeWidth={2.4} /> 수정
              </button>
            </div>
            <p>{p.maskedEmail}</p>
          </div>
        </section>

        <section className="mp-stats">
          <div><span>누적 주행</span><b>{p.totalKm}</b></div>
          <div><span>절감 금액</span><b className="mp-mint">{p.totalSaving}</b></div>
          <div><span>절감 연료</span><b className="mp-mint">{p.totalFuel}</b></div>
        </section>

        <section className="mp-card mp-car">
          <div className="mp-car__head">
            <b>내 차</b>
            <button onClick={() => navigate('/car/manage')}>수정 ›</button>
          </div>
          <dl>
            <div><dt>차종</dt><dd>{car.type}</dd></div>
            <div><dt>제조사 · 모델</dt><dd>{car.makerModel}</dd></div>
            <div><dt>연료</dt><dd>{car.fuel}</dd></div>
            <div><dt>통행료 기준</dt><dd>{car.tollClass}</dd></div>
          </dl>
        </section>

        <nav className="mp-card mp-menu" aria-label="메뉴">
          {MENU.map((m) => (
            <button key={m.path} onClick={() => navigate(m.path)}>
              <Icon name={m.icon} size={18} />
              <span>{m.label}</span>
              <Icon name="chevron" size={18} />
            </button>
          ))}
        </nav>

        <button className="mp-card mp-fuel" onClick={handleFuelPrice}>
          <div>
            <span className="mp-mint">연비 계산</span>
            <b>유가 기준</b>
            <p>절감 금액 계산에 쓰여요</p>
          </div>
          <strong>{mockFuelPrice.label} ›</strong>
        </button>
      </div>
      <TabBar />
    </main>
  )
}
