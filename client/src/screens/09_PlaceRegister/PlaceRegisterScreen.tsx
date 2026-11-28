// [프레임] 장소 등록  |  주소: /places/new — 지도에서 위치를 정하고 이름 붙여 저장
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomSheet, Button, ChoiceChips, Icon, IconTile } from '../../components/ui'
import { MapView } from '../../components/map/MapView'
import { mockPlaceSearchResult } from '../../mocks/data'
import './PlaceRegisterScreen.css'

type PlaceName = 'home' | 'work' | 'school' | 'custom'
const PLACE_NAMES: { value: PlaceName; label: string }[] = [
  { value: 'home', label: '집' },
  { value: 'work', label: '회사' },
  { value: 'school', label: '학교' },
  { value: 'custom', label: '직접 입력' },
]

/** '집으로', '회사로'처럼 받침에 맞춰 조사를 붙여요 */
function withRo(word: string) {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  const jong = code >= 0 && code <= 11171 ? code % 28 : 0
  return jong === 0 || jong === 8 ? `${word}로` : `${word}으로`
}

export function PlaceRegisterScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState<PlaceName>('home')
  const place = mockPlaceSearchResult
  const nameLabel = PLACE_NAMES.find((n) => n.value === name)!.label

  // TODO(기능): 장소 검색 화면 열기(카카오 장소 검색)
  const handleSearch = () => navigate('/search')
  // TODO(기능): '직접 입력'이면 이름 입력창 띄우기
  // TODO(기능): 지도 중심 좌표 + 이름을 즐겨찾기에 저장
  const handleSave = () => navigate('/favorites')

  return (
    <main className="screen screen--map">
      <MapView parks>
        <span className="map-pin" style={{ left: '50%', top: '40%' }}>
          <Icon name="pin" size={40} strokeWidth={2.2} className="map-pin__icon" />
        </span>
      </MapView>
      <div className="map-top">
        <button className="square-btn" onClick={() => navigate(-1)} aria-label="뒤로 가기">
          <Icon name="back" size={22} strokeWidth={2.4} />
        </button>
        <button className="map-search map-search--active" onClick={handleSearch}>
          <Icon name="search" size={18} />
          햇살마을아파트
        </button>
      </div>
      <BottomSheet flat label="장소 정보">
        <div className="place-head">
          <IconTile name="home" size={44} bg="var(--green-card)" />
          <div>
            <b>{place.name}</b>
            <p>{place.address}</p>
          </div>
        </div>
        <p className="field-label" style={{ marginTop: 18 }}>이름</p>
        <ChoiceChips fit options={PLACE_NAMES} value={name} onChange={setName} />
        <p className="hint" style={{ marginTop: 14 }}>지도를 움직여서 위치를 정확히 맞출 수 있어요.</p>
        <Button style={{ marginTop: 20 }} onClick={handleSave}>
          {name === 'custom' ? '저장' : `${withRo(nameLabel)} 저장`}
        </Button>
      </BottomSheet>
    </main>
  )
}
