// [프레임] 주행 리포트 (리포트 탭)  |  주소: /report
import { useState } from 'react'
import { Icon, TabBar } from '../../components/ui'
import { mockLatestTrip, mockMonth, mockTripsByDay } from '../../mocks/data'
import './ReportScreen.css'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const won = (n: number) => n.toLocaleString('ko-KR')

export function ReportScreen() {
  const m = mockMonth
  const t = mockLatestTrip
  const [selectedDay, setSelectedDay] = useState(22)

  const daysInMonth = new Date(m.year, m.month, 0).getDate()
  const firstWeekday = new Date(m.year, m.month - 1, 1).getDay()
  const monthTotal = Object.values(m.dailySaving).reduce((a, b) => a + b, 0)
  const trips = mockTripsByDay[selectedDay] ?? (m.dailySaving[selectedDay]
    ? [{ id: 'x', name: `${m.month}월 ${selectedDay}일 주행`, detail: '자세한 기록은 서버 연결 후 보여요', saving: `약 ${m.dailySaving[selectedDay]}원` }]
    : [])

  // TODO(기능): 이전 달 · 다음 달 기록 불러오기
  const handlePrevMonth = () => {}
  const handleNextMonth = () => {}
  // TODO(기능): 누적 기록 상세 화면 (디자인 없음)
  const handleOpenTotal = () => {}
  // TODO(기능): 주행 1건 상세 → 위쪽 에코 점수 카드를 그 주행으로 바꾸기
  const handleOpenTrip = (_id: string) => {}

  return (
    <main className="screen screen--padded screen--with-tabbar report">
      <div className="screen__body">
        <h1 className="page-title" style={{ marginTop: 18 }}>주행 리포트</h1>
        <p className="page-desc" style={{ marginTop: 2 }}>{t.dateLabel}</p>

        <section className="rp-eco">
          <div className="rp-eco__head">
            <span>에코 점수</span>
            <span className="rp-pill">▲ {t.vsLast}</span>
          </div>
          <div className="rp-eco__score">
            {t.ecoScore}<small>/ 100점</small>
          </div>
          <p className="rp-eco__events">{t.events}</p>
        </section>

        <div className="rp-tiles">
          <div className="rp-tile">
            <span>절감 금액</span>
            <b className="rp-mint">약 {t.saving}<small>원</small></b>
            <p>평균 운전 대비 추정</p>
          </div>
          <div className="rp-tile">
            <span>절감 연료</span>
            <b className="rp-mint">{t.fuel}<small>L</small></b>
            <p>{t.fuelBasis}</p>
          </div>
        </div>

        <button className="rp-total" onClick={handleOpenTotal}>
          <div>
            <span>지금까지</span>
            <b>연료 <em>{t.total.fuel}</em> 절감 · 연비 <em>{t.total.efficiency}</em></b>
          </div>
          <Icon name="chevron" size={20} />
        </button>

        <div className="rp-month-nav">
          <button onClick={handlePrevMonth} aria-label="이전 달"><Icon name="back" size={20} /></button>
          <b>{m.year}년 {m.month}월</b>
          <button onClick={handleNextMonth} aria-label="다음 달" disabled><Icon name="chevron" size={20} /></button>
        </div>

        <section className="rp-month">
          <span>이번 달 절감 금액</span>
          <b>약 {won(monthTotal)}<small>원</small></b>
          <div className="rp-month__foot">
            <p>주행 {m.trips}회 · 절감 연료 {m.fuelSaved}</p>
            <span className="rp-pill">지난달보다 {m.vsLastMonth}</span>
          </div>
        </section>

        <section className="rp-cal" aria-label={`${m.month}월 달력`}>
          <div className="rp-cal__grid">
            {WEEKDAYS.map((w, i) => (
              <span key={w} className={`rp-cal__wd ${i === 0 ? 'rp-cal__wd--sun' : ''}`}>{w}</span>
            ))}
            {Array.from({ length: firstWeekday }, (_, i) => <span key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const d = i + 1
              const saving = m.dailySaving[d]
              const future = d > m.today
              const cls = ['rp-day', saving && 'rp-day--drive', d === selectedDay && 'rp-day--on', future && 'rp-day--future'].filter(Boolean).join(' ')
              return (
                <button
                  key={d}
                  className={cls}
                  disabled={!saving}
                  onClick={() => setSelectedDay(d)}
                  aria-pressed={d === selectedDay}
                  aria-label={`${d}일${saving ? `, 약 ${saving}원 절감` : ''}${d === m.today ? ', 오늘' : ''}`}
                >
                  {d}
                  {saving ? <small>{saving}</small> : d === m.today ? <small className="rp-day__today">오늘</small> : null}
                </button>
              )
            })}
          </div>
        </section>

        {trips.length > 0 && (
          <section className="rp-trips" aria-label={`${m.month}월 ${selectedDay}일 주행`}>
            {trips.map((tr) => (
              <button key={tr.id} className="rp-trip" onClick={() => handleOpenTrip(tr.id)}>
                <div>
                  <b>{tr.name}</b>
                  <span>{tr.detail}</span>
                </div>
                <em>{tr.saving}</em>
              </button>
            ))}
          </section>
        )}
      </div>
      <TabBar />
    </main>
  )
}
