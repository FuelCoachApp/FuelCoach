// 지도. 카카오 지도를 띄우고, 키가 없거나 불러오기에 실패하면 예전처럼 도로 모양 그림을 보여 줘요.
// 이 컴포넌트 안만 바꾸면 모든 화면에 적용돼요.
//
// 좌표는 서버와 똑같이 [경도, 위도] 순서로 받아요. (카카오 LatLng은 위도가 먼저라 안에서 바꿔 줘요)
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { loadKakaoMap } from '../../lib/kakaoMap'
import { Icon } from '../ui/Icon'
import './map.css'

/* eslint-disable @typescript-eslint/no-explicit-any */

export type LngLat = [number, number]

export type RouteRoad = {
  from: number // path 에서 이 도로가 시작하는 위치
  to: number
  /** 0 정보없음, 1 정체, 2 지체, 3 서행, 4 원활, 6 사고 통제 */
  trafficState?: number
}

export type MapMarker = {
  x: number // 경도
  y: number // 위도
  /** 코칭 지점 종류: CAMERA, BUMP, DROWSY_REST, CURVE, SIGNAL, SCHOOL_ZONE */
  type?: string
  label?: string
}

type Props = {
  /** 주행 화면 강조 효과: coach = 코칭(초록), guide = 길안내(빨강) */
  emphasis?: 'none' | 'coach' | 'guide'
  /** 시트가 위에 올라와 있을 때 지도를 어둡게 */
  dimmed?: boolean
  /** 공원(초록 사각형) 표시 — 그림 지도에서만 */
  parks?: boolean
  /** 실제 지도 없이 바탕색만 (도착 화면) */
  plain?: boolean
  /** 지도 중심 [경도, 위도]. 없으면 천안역 근처 */
  center?: LngLat
  /** 확대 수준 (작을수록 가까이). 기본 4 */
  level?: number
  /** 경로선 [[경도, 위도], ...] — 서버 /api/directions 의 path */
  path?: LngLat[]
  /** 경로 위 코칭 지점 — 서버 /api/directions 의 coachingPoints */
  markers?: MapMarker[]
  /** 도로별 구간 — 서버 /api/directions 의 roads (traffic 과 같이 쓰면 정체 색으로 칠해요) */
  roads?: RouteRoad[]
  /** 경로선을 원활(민트)·서행(노랑)·정체(빨강) 색으로 */
  traffic?: boolean
  /** 경로에 화면을 맞출 때 여백 [위, 오른쪽, 아래, 왼쪽] px. 기본은 주행 화면 기준 */
  fitPadding?: [number, number, number, number]
  /** 내 위치를 찾아서 가운데로 옮기고 점으로 표시 */
  myLocation?: boolean
  /** 화면 가운데 핀 (장소 등록처럼 지도 중심을 고를 때) */
  centerPin?: boolean
  /** 지도를 움직일 때마다 가운데 좌표 [경도, 위도] 를 알려 줘요 */
  onCenterChange?: (center: LngLat) => void
  /** 지도 위에 얹을 것. 버튼 같은 건 그대로 보이고,
   *  그림 지도 전용 표시물(.map-route .map-arrow .map-dot .map-pin .route__stage)은 실제 지도에서 숨겨요 (map.css) */
  children?: ReactNode
}

const DEFAULT_CENTER: LngLat = [127.1464, 36.8101] // 천안역 근처
const MARKER_LABEL: Record<string, string> = {
  CAMERA: '단속',
  BUMP: '방지턱',
  DROWSY_REST: '쉼터',
  CURVE: '급커브',
  SIGNAL: '신호',
  SCHOOL_ZONE: '스쿨존',
}
// 화면 위·아래 카드에 경로가 가리지 않도록 여백(px): 위, 오른쪽, 아래, 왼쪽
const ROUTE_PADDING: [number, number, number, number] = [190, 48, 230, 48]
const MINT = '#2CC7B4'
function trafficColor(state?: number) {
  if (state === 3) return '#F2C14E' // 서행
  if (state === 1 || state === 2 || state === 6) return '#F0605D' // 정체·지체·사고
  return MINT // 원활·정보없음
}

type MapState = 'loading' | 'ready' | 'fallback'

export function MapView({
  emphasis = 'none', dimmed, parks, plain, center, level = 4, path, markers, roads, traffic, fitPadding = ROUTE_PADDING,
  myLocation, centerPin, onCenterChange, children,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [state, setState] = useState<MapState>(plain ? 'fallback' : 'loading')
  const [reason, setReason] = useState('')
  const onCenterChangeRef = useRef(onCenterChange)
  onCenterChangeRef.current = onCenterChange

  // 1) 지도 만들기
  useEffect(() => {
    if (plain) return
    let cancelled = false
    loadKakaoMap()
      .then((kakao) => {
        if (cancelled || !boxRef.current) return
        const [x, y] = center ?? DEFAULT_CENTER
        const map = new kakao.maps.Map(boxRef.current, { center: new kakao.maps.LatLng(y, x), level })
        mapRef.current = map
        kakao.maps.event.addListener(map, 'idle', () => {
          const c = map.getCenter()
          onCenterChangeRef.current?.([c.getLng(), c.getLat()])
        })
        setState('ready')
      })
      .catch((err: Error) => {
        if (cancelled) return
        setReason(err.message)
        setState('fallback')
      })
    return () => {
      cancelled = true
      mapRef.current = null
    }
    // center·level 은 처음 만들 때만 써요. 이후 이동은 아래 효과들이 맡아요.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plain])

  // 2) 화면 크기가 바뀌면 지도 다시 맞추기 (시트가 열리고 닫힐 때 등)
  useEffect(() => {
    if (state !== 'ready' || !boxRef.current) return
    const ro = new ResizeObserver(() => mapRef.current?.relayout())
    ro.observe(boxRef.current)
    return () => ro.disconnect()
  }, [state])

  // 3) 경로선과 코칭 지점 그리기
  useEffect(() => {
    const map = mapRef.current
    if (state !== 'ready' || !map) return
    const { kakao } = window
    const drawn: any[] = []

    if (path && path.length > 1) {
      const points = path.map(([x, y]) => new kakao.maps.LatLng(y, x))
      const casing = new kakao.maps.Polyline({ path: points, strokeWeight: 11, strokeColor: '#15212C', strokeOpacity: 0.9 })
      casing.setMap(map)
      drawn.push(casing)

      const pieces =
        traffic && roads?.length
          ? roads.map((r) => ({ pts: points.slice(r.from, r.to + 1), color: trafficColor(r.trafficState) }))
          : [{ pts: points, color: MINT }]
      for (const piece of pieces) {
        if (piece.pts.length < 2) continue
        const line = new kakao.maps.Polyline({ path: piece.pts, strokeWeight: 7, strokeColor: piece.color, strokeOpacity: 1 })
        line.setMap(map)
        drawn.push(line)
      }

      const bounds = new kakao.maps.LatLngBounds()
      points.forEach((p: any) => bounds.extend(p))
      map.setBounds(bounds, ...fitPadding)
    }

    for (const m of markers ?? []) {
      const el = document.createElement('div')
      el.className = `map-marker map-marker--${(m.type ?? 'etc').toLowerCase()}`
      el.textContent = m.label ?? MARKER_LABEL[m.type ?? ''] ?? '코칭'
      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(m.y, m.x),
        content: el,
        xAnchor: 0.5,
        yAnchor: 0.5,
        zIndex: 3,
      })
      overlay.setMap(map)
      drawn.push(overlay)
    }

    return () => drawn.forEach((o) => o.setMap(null))
    // fitPadding 은 숫자 4개라 내용으로 비교해요
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, path, markers, roads, traffic, fitPadding.join(',')])

  // 4) 내 위치
  useEffect(() => {
    const map = mapRef.current
    if (state !== 'ready' || !map || !myLocation || !navigator.geolocation) return
    const { kakao } = window
    let overlay: any = null
    let cancelled = false
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled) return
        const here = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
        const el = document.createElement('div')
        el.className = 'map-me'
        el.setAttribute('aria-label', '내 위치')
        overlay = new kakao.maps.CustomOverlay({ position: here, content: el, xAnchor: 0.5, yAnchor: 0.5, zIndex: 4 })
        overlay.setMap(map)
        map.setCenter(here)
      },
      () => {
        // 권한 거부·실패하면 기본 위치(천안역 근처)에 그대로 둬요.
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 },
    )
    return () => {
      cancelled = true
      overlay?.setMap(null)
    }
  }, [state, myLocation])

  const real = state !== 'fallback'

  return (
    <div className={`map ${real ? 'map--real' : ''}`} aria-label="지도">
      {real ? (
        <div ref={boxRef} className="map__kakao" />
      ) : (
        <>
          <svg className="map__svg" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <rect width="390" height="844" fill="var(--map-bg)" />
            {!plain && (
              <>
                {[56, 197, 325].map((x) => (
                  <rect key={x} x={x - 8} y={0} width={16} height={844} fill="var(--map-road)" />
                ))}
                {[158, 367, 567, 727].map((y) => (
                  <rect key={y} x={0} y={y - 8} width={390} height={16} fill="var(--map-road)" />
                ))}
                <path d="M17 425 L189 180" stroke="var(--map-road)" strokeWidth="16" />
              </>
            )}
            {parks && !plain && <rect x="225" y="399" width="85" height="64" rx="8" fill="var(--map-park)" />}
          </svg>
          {!plain && import.meta.env.DEV && (
            <div className="map__notice">
              {reason === 'NO_KEY'
                ? '카카오 지도 키 없음 · client/.env 의 VITE_KAKAO_JS_KEY 확인'
                : '카카오 지도 불러오기 실패 · 키, 도메인 등록, 카카오맵 사용 설정 확인'}
            </div>
          )}
        </>
      )}
      {children}
      {real && centerPin && (
        <span className="map-center-pin" aria-hidden>
          <Icon name="pin" size={40} strokeWidth={2.2} className="map-pin__icon" />
        </span>
      )}
      {emphasis !== 'none' && <div className={`map__emphasis map__emphasis--${emphasis}`} />}
      {dimmed && <div className="map__dim" />}
    </div>
  )
}
