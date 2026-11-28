// 지도 자리. 지금은 카카오 지도를 연결하기 전이라 도로 모양 그림으로 대신해요.
// TODO(지도): 카카오 지도 SDK 연결 — 이 컴포넌트 안만 바꾸면 모든 화면에 적용돼요.
import type { ReactNode } from 'react'
import './map.css'

type Props = {
  /** 주행 화면 강조 효과: coach = 코칭(초록), guide = 길안내(빨강) */
  emphasis?: 'none' | 'coach' | 'guide'
  /** 시트가 위에 올라와 있을 때 지도를 어둡게 */
  dimmed?: boolean
  /** 공원(초록 사각형) 표시 */
  parks?: boolean
  /** 도로 없이 바탕색만 (도착 화면) */
  plain?: boolean
  children?: ReactNode
}

export function MapView({ emphasis = 'none', dimmed, parks, plain, children }: Props) {
  return (
    <div className="map" aria-label="지도">
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
      {emphasis !== 'none' && <div className={`map__emphasis map__emphasis--${emphasis}`} />}
      {dimmed && <div className="map__dim" />}
      {children}
    </div>
  )
}
