// 서버 길찾기(/api/directions)를 불러오는 훅
// 서버가 카카오 길찾기를 대신 부르고, 경로 위 코칭 지점(단속카메라 등)까지 붙여서 돌려줘요.
import { useEffect, useState } from 'react'
import type { LngLat, MapMarker, RouteRoad } from '../components/map/MapView'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export type CoachingPoint = MapMarker & {
  id: string
  type: string
  alongM: number // 출발지에서 경로를 따라간 거리(m)
  offsetM: number // 경로선에서 떨어진 거리(m)
  attrs?: Record<string, unknown>
}

export type RouteGuide = {
  x: number
  y: number
  type: number
  name: string
  guidance: string
  distance: number
  duration: number
}

export type RouteResult = {
  distance: number // m
  duration: number // 초
  toll: number // 원
  path: LngLat[]
  roads: (RouteRoad & { name: string; distance: number; duration: number; trafficSpeed: number })[]
  guides: RouteGuide[]
  coachingPoints: CoachingPoint[]
}

export function useRoute(origin?: LngLat, destination?: LngLat) {
  const [route, setRoute] = useState<RouteResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const key = origin && destination ? `${origin.join(',')}|${destination.join(',')}` : ''

  useEffect(() => {
    if (!origin || !destination) return
    const ctrl = new AbortController()
    setLoading(true)
    setError(null)
    const qs = new URLSearchParams({ origin: origin.join(','), destination: destination.join(',') })
    fetch(`${API_BASE}/api/directions?${qs}`, { signal: ctrl.signal })
      .then(async (res) => {
        const body = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(body.message || `서버 오류 (HTTP ${res.status})`)
        return body as { routes: RouteResult[] }
      })
      .then((body) => setRoute(body.routes[0] ?? null))
      .catch((err: Error) => {
        if (err.name === 'AbortError') return
        // 서버가 꺼져 있으면 'Failed to fetch' 가 와요.
        setError(err.message === 'Failed to fetch' ? '서버에 연결하지 못했어요. server 폴더에서 npm run dev 를 켜 주세요.' : err.message)
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false)
      })
    return () => ctrl.abort()
    // 좌표 값이 바뀔 때만 다시 불러요.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return { route, error, loading }
}
