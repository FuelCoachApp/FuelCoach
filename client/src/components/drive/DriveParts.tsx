// 주행 화면 전용 부품: 길안내 카드, 코칭 카드, 속도 표지판, 하단 바 등
import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { Icon, type IconName } from '../ui'
import type { Maneuver } from '../../mocks/data'
import './drive.css'

/** 위·아래로 미는 동작을 감지해요. 손가락이 카드 밖으로 나가도 끝까지 따라가요 */
function useVerticalSwipe(direction: 'up' | 'down', threshold: number, onSwipe?: () => void) {
  const startY = useRef<number | null>(null)
  return {
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      startY.current = e.clientY
      // 안쪽 버튼은 원래대로 눌리도록 버튼이 아닐 때만 포인터를 붙잡아요
      if (!(e.target as HTMLElement).closest('button')) e.currentTarget.setPointerCapture(e.pointerId)
    },
    onPointerUp: (e: PointerEvent<HTMLElement>) => {
      if (startY.current === null) return
      const moved = direction === 'up' ? startY.current - e.clientY : e.clientY - startY.current
      startY.current = null
      if (moved > threshold) onSwipe?.()
    },
    onPointerCancel: () => (startY.current = null),
  }
}

/* ---------------- 길안내 카드 (화면 맨 위) ---------------- */
type Lane = 'up' | 'right'
type NavCardProps = {
  maneuver: Maneuver
  title: string
  toll?: string
  distance: string
  next: string
  lanes: readonly Lane[]
  activeLanes: number[]
}
export function NavCard({ maneuver, title, toll, distance, next, lanes, activeLanes }: NavCardProps) {
  return (
    <section className={`nav-card nav-card--${maneuver}`} aria-label="길안내">
      <div className="nav-card__main">
        <div className="nav-card__tile">
          {maneuver === 'ic' ? <span className="nav-card__ic">IC</span> : <Icon name="turnRight" size={28} strokeWidth={2.6} />}
        </div>
        <div className="nav-card__text">
          <div className="nav-card__title">
            {title}
            {toll && <span className="nav-card__toll">{toll}</span>}
          </div>
          <div className="nav-card__distance">{distance}</div>
        </div>
        <div className="nav-card__next">
          <span>다음</span>
          <b>{next}</b>
        </div>
      </div>
      <div className="nav-card__lanes" aria-label="차선 안내">
        {lanes.map((l, i) => (
          <span key={i} className={`lane ${activeLanes.includes(i) ? 'lane--on' : ''}`}>
            <Icon name={l === 'up' ? 'arrowUp' : 'turnRight'} size={18} strokeWidth={2.4} />
          </span>
        ))}
      </div>
    </section>
  )
}

/* ---------------- 코칭 카드 (주행 화면용, 위로 밀면 음소거) ---------------- */
type CoachingCardProps = {
  distance: string
  target: string
  message: string
  nextHint?: string
  /** 위로 스와이프했을 때 호출 → 코칭 음성 끄기 */
  onSwipeUp?: () => void
}
export function CoachingCard({ distance, target, message, nextHint, onSwipeUp }: CoachingCardProps) {
  const swipe = useVerticalSwipe('up', 40, onSwipeUp)
  return (
    <section className="coach-card" aria-label="탄력주행 코칭 (위로 밀면 음성 끄기)" {...swipe}>
      <div className="coach-card__top">
        <span className="coach-card__badge">탄력주행 코칭</span>
        {nextHint && <span className="coach-card__badge">{nextHint}</span>}
      </div>
      <div className="coach-card__distance">
        {distance}
        <small>{target}</small>
      </div>
      <div className="coach-card__message">{message}</div>
    </section>
  )
}

/* ---------------- 코칭 알림 (정리표·주행 공용) ---------------- */
export type CoachingKind = 'camera' | 'toll' | 'curve' | 'congestion' | 'signal'
const KIND_ICON: Record<CoachingKind, IconName> = {
  camera: 'camera',
  toll: 'toll',
  curve: 'curve',
  congestion: 'congestion',
  signal: 'signal',
}
export function CoachingAlert({ kind, value, label, message }: { kind: CoachingKind; value: string; label: string; message: string }) {
  return (
    <div className="coach-alert">
      <span className="coach-alert__icon"><Icon name={KIND_ICON[kind]} size={24} /></span>
      <div>
        <div className="coach-alert__value">
          {value}
          <small>{label}</small>
        </div>
        <div className="coach-alert__message">{message}</div>
      </div>
    </div>
  )
}

export function StartHint({ children }: { children: ReactNode }) {
  return (
    <div className="start-hint">
      <Icon name="sound" size={16} />
      <span>{children}</span>
    </div>
  )
}

export function BumpChip({ children }: { children: ReactNode }) {
  return (
    <div className="bump-chip">
      <Icon name="bump" size={18} />
      {children}
    </div>
  )
}

/** 코칭 음성을 끈 상태. 아래로 당기면 다시 켜져요 */
export function MutedBar({ onPullDown }: { onPullDown?: () => void }) {
  const swipe = useVerticalSwipe('down', 30, onPullDown)
  return (
    <div className="muted-bar" role="status" {...swipe}>
      <Icon name="mute" size={18} />
      <span>코칭 음성 꺼짐 · 화면 알림만 보여요</span>
      <button className="muted-bar__action" onClick={onPullDown}>
        <Icon name="chevronDown" size={14} strokeWidth={2.6} />
        당겨서 켜기
      </button>
    </div>
  )
}

/* ---------------- 속도 표지판 ---------------- */
export function SpeedSign({ limit, current, large }: { limit: number; current: number; large?: boolean }) {
  return (
    <div className="speed">
      <div className="speed__limit" aria-label={`제한속도 ${limit}`}>{limit}</div>
      <div className={`speed__current ${large ? 'speed__current--lg' : ''}`} aria-label={`현재 속도 ${current}km/h`}>{current}</div>
    </div>
  )
}

/* ---------------- 하이패스 요금 표시 ---------------- */
export function HipassChip({ label, fee }: { label: string; fee: string }) {
  return (
    <div className="hipass">
      <b>하이패스</b> {label} {fee}
    </div>
  )
}

/* ---------------- 주행 하단 바 ---------------- */
type BottomBarProps = {
  destName: string
  destArea: string
  arrive: string
  remainKm: number
  onRefresh?: () => void
  onMenu?: () => void
}
export function DriveBottomBar({ destName, destArea, arrive, remainKm, onRefresh, onMenu }: BottomBarProps) {
  // TODO(기능): 목적지 ↔ 현재 위치(도로명)를 몇 초마다 번갈아 보여주기
  return (
    <footer className="drive-bar">
      <button className="drive-bar__btn" onClick={onRefresh} aria-label="경로 새로고침">
        <Icon name="refresh" size={28} strokeWidth={2.2} />
      </button>
      <div className="drive-bar__center">
        <div className="drive-bar__dest">
          {destName} <small>{destArea}</small>
        </div>
        <div className="drive-bar__eta">
          {arrive}
          <span>{remainKm}km</span>
        </div>
      </div>
      {onMenu ? (
        <button className="drive-bar__btn" onClick={onMenu} aria-label="경로 메뉴">
          <Icon name="menu" size={28} strokeWidth={2.2} />
        </button>
      ) : (
        <span className="drive-bar__btn" />
      )}
    </footer>
  )
}

/* ---------------- 내 위치 버튼 ---------------- */
export function LocateButton({ onClick, style }: { onClick?: () => void; style?: CSSProperties }) {
  return (
    <button className="locate-btn" onClick={onClick} aria-label="현재 위치로 이동" style={style}>
      <Icon name="locate" size={22} />
    </button>
  )
}

/* ---------------- 주행 방향 화살표 ---------------- */
export function NavArrow({ tone = 'lavender' }: { tone?: 'lavender' | 'mint' }) {
  return tone === 'mint' ? (
    <svg width="34" height="40" viewBox="0 0 34 40" aria-hidden>
      <path d="M17 0 34 40 17 31 0 40Z" fill="var(--mint)" />
    </svg>
  ) : (
    <svg width="40" height="46" viewBox="0 0 40 46" aria-hidden>
      <path d="M20 2 37 43 20 34 3 43Z" fill="#fff" stroke="var(--lavender)" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}

/** 코칭 음성 켜고 끄기 상태 (스와이프·버튼 공용) */
export function useCoachVoice(initial = true) {
  const [on, setOn] = useState(initial)
  // TODO(기능): 실제 음성 출력(TTS) 켜기·끄기 연결
  return { on, mute: () => setOn(false), unmute: () => setOn(true), setOn }
}
