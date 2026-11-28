// [프레임] 이 경로 즐겨찾기 시트  |  주소: /route/favorite
// 경로 추천 화면 위에 즐겨찾기 저장 시트가 올라온 상태예요.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomSheet, Button, ChoiceChips, InfoNote, TextField } from '../../components/ui'
import { mockRoutePoints } from '../../mocks/data'
import { RouteRecommendScreen } from '../28_RouteRecommend/RouteRecommendScreen'
import './RouteFavoriteSheetScreen.css'

type RouteOption = 'rec' | 'fast' | 'short' | 'free'
const OPTIONS: { value: RouteOption; label: string }[] = [
  { value: 'rec', label: '추천' },
  { value: 'fast', label: '최소 시간' },
  { value: 'short', label: '최단 거리' },
  { value: 'free', label: '무료 도로' },
]

export function RouteFavoriteSheetScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('학교 가는 길 (시청 경유)')
  const [option, setOption] = useState<RouteOption>('rec')
  const via = mockRoutePoints.via.replace(' (경유)', '')

  const handleClose = () => navigate('/route', { replace: true })
  // TODO(기능): 이름 · 경유지 · 경로 옵션을 즐겨찾기(경로)로 저장 → 즐겨찾기 관리 · 홈 즐겨찾기 탭에 표시
  const handleSave = () => handleClose()

  return (
    <RouteRecommendScreen>
      <BottomSheet backdrop onClose={handleClose} label="이 경로 즐겨찾기">
        <h2 className="sheet__title">이 경로 즐겨찾기</h2>
        <p className="sheet__desc">자주 가는 길을 저장하면 홈에서 바로 안내를 시작해요.</p>

        <div className="fav-sheet__name">
          <TextField label="이름" value={name} onChange={setName} placeholder="경로 이름" />
        </div>

        <p className="field-label" style={{ marginTop: 22 }}>경로</p>
        <div className="fav-sheet__points">
          <div><span className="route__dot route__dot--start" />출발 · 그때의 내 위치</div>
          <div><span className="route__dot route__dot--via" />경유 · {via}</div>
          <div><span className="route__dot route__dot--end" />도착 · {mockRoutePoints.end}</div>
        </div>

        <p className="field-label" style={{ marginTop: 22 }}>경로 옵션</p>
        <div className="fav-sheet__options">
          <ChoiceChips fit nowrap options={OPTIONS} value={option} onChange={setOption} />
        </div>

        <div style={{ marginTop: 56 }}>
          <InfoNote>
            경로 모양이 아니라 조건(경유지 · 옵션)을 저장해요.
            <br />
            누를 때마다 그때 교통 상황으로 다시 찾아요.
          </InfoNote>
        </div>
        <Button onClick={handleSave} style={{ marginTop: 16 }}>저장</Button>
      </BottomSheet>
    </RouteRecommendScreen>
  )
}
