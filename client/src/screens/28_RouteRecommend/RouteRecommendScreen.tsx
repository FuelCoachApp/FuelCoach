// [프레임] 경로 추천  |  주소: /route
// 위: 출발·경유·도착 / 가운데: 지도(경로 색 = 원활·서행·정체, 주변 주유소 가격) / 아래: 경로 3개 + 안내 시작
import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from '../../components/ui'
import { MapView } from '../../components/map/MapView'
import { mockGasPrices, mockRouteOptions, mockRoutePoints, mockTrip } from '../../mocks/data'
import { useRoute } from '../../hooks/useRoute'
import './RouteRecommendScreen.css'

/** children: 위에 덮을 시트 (경로 즐겨찾기 프레임에서 사용) */
export function RouteRecommendScreen({ children }: { children?: ReactNode }) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(mockRouteOptions[0].id)
  const [showGas, setShowGas] = useState(true)
  const [via, setVia] = useState<string | null>(mockRoutePoints.via)
  // 서버 길찾기: 경로선(정체 색) + 경로 위 코칭 지점. TODO(데이터): 출발·경유·도착을 실제 값으로
  const { route, error: routeError } = useRoute(mockTrip.origin, mockTrip.destination)

  // TODO(기능): 경유지 검색 화면 열기 (최대 3곳)
  const handleAddVia = () => {}
  // TODO(기능): 경유지를 빼고 경로 다시 찾기
  const handleRemoveVia = () => setVia(null)
  // TODO(기능): 주변 주유소 가격을 오피넷 API로 불러오기
  const handleToggleGas = () => setShowGas((v) => !v)
  // TODO(기능): 고른 경로 정보를 주행 세션에 넘기기
  const handleStart = () => navigate('/drive/vehicle')

  return (
    <main className="screen screen--map route">
      <div className="route__top">
        <button className="route__square" onClick={() => navigate(-1)} aria-label="뒤로 가기">
          <Icon name="back" size={22} strokeWidth={2.4} />
        </button>
        <div className="route__points">
          <div className="route__point">
            <span className="route__dot route__dot--start" />
            {mockRoutePoints.start}
          </div>
          {via && (
            <div className="route__point">
              <span className="route__dot route__dot--via" />
              {via}
              <button className="route__remove" onClick={handleRemoveVia} aria-label="경유지 빼기">
                <Icon name="close" size={14} strokeWidth={2.4} />
              </button>
            </div>
          )}
          <div className="route__point">
            <span className="route__dot route__dot--end" />
            {mockRoutePoints.end}
          </div>
        </div>
        <button className="route__square route__save" onClick={() => navigate('/route/favorite')} aria-label="이 경로 즐겨찾기">
          <Icon name="star" size={22} />
          <span>저장</span>
        </button>
      </div>

      <div className="route__sub">
        <button className="route__add" onClick={handleAddVia}>+ 경유지 추가</button>
        <div className="route__legend" aria-label="경로 색 안내">
          <span className="route__legend--smooth">원활</span>
          <span className="route__legend--slow">서행</span>
          <span className="route__legend--jam">정체</span>
        </div>
      </div>

      <div className="route__map">
        <MapView path={route?.path} roads={route?.roads} traffic markers={route?.coachingPoints} fitPadding={[56, 28, 24, 28]}>
          {/* 그림 지도용 표시물 — 실제 지도가 뜨면 숨겨지고, 위 path·roads 로 그려요 */}
          <div className="route__stage">
            <svg viewBox="0 0 390 166" width="390" height="166" aria-hidden>
              <path d="M59 175V140H189" stroke="var(--mint)" strokeWidth="5" fill="none" />
              <path d="M189 140V102" stroke="var(--amber)" strokeWidth="5" />
              <path d="M189 104V69H251" stroke="var(--red)" strokeWidth="5" fill="none" />
              <path d="M249 69H321V28" stroke="var(--mint)" strokeWidth="5" fill="none" />
              <circle cx="189" cy="140" r="8" fill="var(--bg)" stroke="var(--text)" strokeWidth="3" />
            </svg>
            <span className="route__pin"><Icon name="pin" size={26} strokeWidth={2.4} /></span>
            {showGas && mockGasPrices.map((g, i) => (
              <span key={g.id} className={`route__gas route__gas--${i}`}>
                <Icon name="fuel" size={14} strokeWidth={2.2} />
                {g.price}
              </span>
            ))}
          </div>
          {routeError && <div className="map__notice">경로를 못 불러왔어요 · {routeError}</div>}
          <button className={`route__gas-toggle ${showGas ? '' : 'route__gas-toggle--off'}`} onClick={handleToggleGas} aria-pressed={showGas}>
            <Icon name="fuel" size={17} />
            주변 주유소 {showGas ? 'ON' : 'OFF'}
          </button>
        </MapView>
      </div>

      <section className="route__sheet" aria-label="추천 경로">
        <div className="sheet__handle" />
        <button className="route__compare" onClick={() => navigate('/drive/departure')}>
          <Icon name="clock" size={17} />
          출발 시간 비교
        </button>
        <div className="route__cols">
          <span>경로 · 도착 예정</span>
          <span>총 이동 비용 (기름값 + 통행료)</span>
        </div>
        <div role="radiogroup">
          {mockRouteOptions.map((o) => {
            const on = o.id === selected
            return (
              <button key={o.id} role="radio" aria-checked={on} className={`route-opt ${on ? 'route-opt--on' : ''}`} onClick={() => setSelected(o.id)}>
                <div>
                  <div className="route-opt__title">
                    <small>{o.label}</small>
                    {o.arrive}
                  </div>
                  <div className="route-opt__detail">{o.detail}</div>
                </div>
                <div className="route-opt__cost">
                  <b>{o.cost}</b>
                  <span>{o.costSub}</span>
                </div>
              </button>
            )
          })}
        </div>
        <Button onClick={handleStart} style={{ marginTop: 14 }}>안내 시작</Button>
      </section>

      {children}
    </main>
  )
}
