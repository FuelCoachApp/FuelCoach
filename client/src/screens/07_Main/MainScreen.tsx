// [프레임] 메인 (홈 탭)  |  주소: /main
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon, ListRow, TabBar, UnderlineTabs } from '../../components/ui'
import { LocateButton } from '../../components/drive/DriveParts'
import { MapView } from '../../components/map/MapView'
import { mockFavoritePlaces, mockRecentPlaces } from '../../mocks/data'
import './MainScreen.css'

type HomeTab = 'favorites' | 'recent'

export function MainScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<HomeTab>('favorites')
  const [coachVoiceOn, setCoachVoiceOn] = useState(true)
  const list = tab === 'favorites' ? mockFavoritePlaces : mockRecentPlaces

  // TODO(기능): 목적지 검색 화면 열기
  const handleSearch = () => navigate('/search')
  // TODO(기능): 목적지 없이 안심주행 시작 (GPS 권한 확인 → 주행 화면)
  const handleSafeDrive = () => navigate('/drive/safe')
  // TODO(확인 필요): 디자인의 빈 민트 버튼 — 코칭 음성 켜기/끄기로 가정했어요. 아이콘·기능 정해지면 바꿔주세요
  const handleToggleCoachVoice = () => setCoachVoiceOn((v) => !v)
  // TODO(기능): 지도를 내 위치로 이동 (카카오 지도 setCenter)
  const handleLocate = () => {}
  // TODO(기능): 고른 장소를 목적지로 넘기기
  const handleOpenPlace = (_id: string) => navigate('/route')

  return (
    <main className="screen screen--map">
      <MapView myLocation>
        <span className="map-dot" style={{ left: '49.5%', top: '39%' }} aria-label="내 위치" />
      </MapView>

      <div className="map-top" style={{ right: 8 }}>
        <button className="map-search" onClick={handleSearch}>
          <Icon name="search" size={20} />
          어디로 갈까요?
        </button>
        <div className="map-side">
          <button className="square-btn square-btn--outline" onClick={handleSafeDrive} aria-label="안심주행 시작">
            <Icon name="navigate" size={24} strokeWidth={2.4} />
          </button>
          <button
            className={`square-btn ${coachVoiceOn ? 'square-btn--mint' : 'square-btn--off'}`}
            onClick={handleToggleCoachVoice}
            aria-pressed={coachVoiceOn}
            aria-label="코칭 음성"
          />
        </div>
      </div>

      <LocateButton onClick={handleLocate} style={{ right: 18, top: 'calc(47% + env(safe-area-inset-top))' }} />

      <section className="home-panel" aria-label="즐겨찾기와 최근 목적지">
        <div className="sheet__handle" />
        <UnderlineTabs
          value={tab}
          onChange={setTab}
          options={[
            { value: 'favorites', label: '즐겨찾기' },
            { value: 'recent', label: '최근 목적지' },
          ]}
        />
        {list.map((p) => (
          <ListRow
            key={p.id}
            leading={<span className="star-tile">{tab === 'favorites' ? <Icon name="star" size={16} /> : <Icon name="pin" size={16} />}</span>}
            title={p.name}
            sub={p.detail}
            chevron
            onClick={() => handleOpenPlace(p.id)}
          />
        ))}
        {tab === 'favorites' && (
          <button className="add-row" onClick={() => navigate('/favorites')}>
            <span className="add-row__icon"><Icon name="plus" size={16} /></span>
            즐겨찾기 추가
          </button>
        )}
      </section>

      <TabBar />
    </main>
  )
}
