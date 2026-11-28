// [프레임] 즐겨찾기 관리  |  주소: /favorites
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Card, Header, Icon, InfoNote, ListRow, Screen, Segmented } from '../../components/ui'
import { mockFavoritePlaces, mockFavoriteRoutes, mockHome } from '../../mocks/data'
import './FavoritesScreen.css'

type FavTab = 'places' | 'routes'

export function FavoritesScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<FavTab>('routes')
  const [editing, setEditing] = useState(false)

  // TODO(기능): 편집 모드 — 순서 바꾸기(드래그), 삭제 버튼 보이기
  const handleToggleEdit = () => setEditing((e) => !e)
  // TODO(기능): 경로 이름·경유지 수정 화면 열기
  const handleEditRoute = (_id: string) => {}
  // TODO(기능): 저장된 경로로 바로 안내 시작
  const handleOpenRoute = (_id: string) => navigate('/route')
  // TODO(기능): 장소를 목적지로 경로 안내
  const handleOpenPlace = (_id: string) => navigate('/route')

  // 디자인대로 두 묶음을 모두 보여주고, 탭은 고른 묶음을 위로 올려요
  const routes = (
    <section key="routes" aria-label="경로">
      {tab === 'places' && <p className="section-label" style={{ margin: '24px 0 10px' }}>경로</p>}
      <Card style={{ padding: '2px 16px' }}>
        {mockFavoriteRoutes.map((r, i) => (
          <div key={r.id} className="fav-route" style={i ? { borderTop: '1px solid var(--line)' } : undefined}>
            <span className="star-tile" style={{ width: 44, height: 44 }}><Icon name="star" size={20} /></span>
            <button className="fav-route__body" onClick={() => handleOpenRoute(r.id)}>
              <b>{r.name}</b>
              <span>{r.path}</span>
              <Badge tone="dark" style={{ marginTop: 8 }}>{r.tag}</Badge>
            </button>
            <button className="fav-route__edit" onClick={() => handleEditRoute(r.id)} aria-label={`${r.name} 수정`}>
              <Icon name="pencil" size={18} />
            </button>
          </div>
        ))}
      </Card>
      <div style={{ marginTop: 16 }}>
        <InfoNote bare>경로 추천 화면에서 ☆를 누르면 경로가 여기에 저장돼요. 홈의 즐겨찾기 탭에서도 바로 보여요.</InfoNote>
      </div>
    </section>
  )

  const places = (
    <section key="places" aria-label="장소">
      <p className="section-label" style={{ margin: tab === 'places' ? '8px 0 10px' : '24px 0 10px' }}>장소</p>
      <Card style={{ padding: '0 16px' }}>
        <ListRow
          title={<span className="fav-place__title"><Icon name="home" size={18} />집</span>}
          sub={mockHome ? mockHome.address : '아직 등록하지 않았어요'}
          trailing={!mockHome && (
            <button className="fav-place__register" onClick={() => navigate('/places/new')}>등록하기 ›</button>
          )}
        />
        {mockFavoritePlaces.map((p) => (
          <ListRow
            key={p.id}
            title={<span className="fav-place__title"><Icon name="star" size={18} className="fav-place__star" />{p.name}</span>}
            sub={p.address}
            chevron
            onClick={() => handleOpenPlace(p.id)}
          />
        ))}
      </Card>
    </section>
  )

  return (
    <Screen padded>
      <Header
        title="즐겨찾기 관리"
        right={<button className="header__action" onClick={handleToggleEdit}>{editing ? '완료' : '편집'}</button>}
      />
      <Segmented
        ariaLabel="즐겨찾기 종류"
        value={tab}
        onChange={setTab}
        options={[
          { value: 'places', label: `장소 ${mockFavoritePlaces.length + 1}` },
          { value: 'routes', label: `경로 ${mockFavoriteRoutes.length}` },
        ]}
      />
      <div style={{ marginTop: 16, paddingBottom: 24 }}>{tab === 'routes' ? [routes, places] : [places, routes]}</div>
    </Screen>
  )
}

