// 화면에서 쓰는 아이콘 모음. <Icon name="back" /> 처럼 써요.
// 색은 글자색(currentColor)을 따라가요.
import type { ReactNode } from 'react'

export type IconName =
  | 'back' | 'chevron' | 'chevronDown' | 'search' | 'star' | 'home' | 'chart' | 'user'
  | 'navigate' | 'locate' | 'refresh' | 'menu' | 'check' | 'pencil' | 'info' | 'shield'
  | 'car' | 'swap' | 'sound' | 'mute' | 'camera' | 'toll' | 'curve' | 'congestion'
  | 'signal' | 'bump' | 'pin' | 'plus' | 'arrowUp' | 'turnRight'
  | 'gear' | 'clock' | 'close' | 'chevronUp' | 'fuel' | 'bars'
  | 'oil' | 'coolant' | 'battery' | 'brake' | 'engine' | 'tire'
  | 'trafficLight' | 'child' | 'intersection' | 'phoneOff' | 'hipass'

const PATHS: Record<IconName, ReactNode> = {
  back: <path d="M15 5 8 12l7 7" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  star: <path d="M12 3.5 14.6 9l5.9.6-4.5 4 1.3 5.9L12 16.5l-5.3 3 1.3-5.9-4.5-4L9.4 9z" fill="currentColor" stroke="none" />,
  home: <path d="M4 11 12 4l8 7v9H4z" />,
  chart: <path d="M6 20v-7M12 20V6M18 20v-10" />,
  user: <><circle cx="12" cy="8.5" r="4" /><path d="M4.5 20c1-5.5 14-5.5 15 0" /></>,
  navigate: <path d="M20 4 4 11l7 2 2 7z" />,
  locate: <><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" fill="currentColor" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" /></>,
  refresh: <path d="M19 12a7 7 0 1 1-2.5-5.4M17 3v4h-4" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  pencil: <path d="m4 20 .8-4.2L15.5 5.1l3.4 3.4L8.2 19.2zM13.5 7l3.5 3.5" />,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 7.6v.4" /></>,
  shield: <><path d="M12 3 19 6v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  car: <><path d="M5 16v-4l2-4h10l2 4v4z" /><circle cx="8" cy="16" r="1.5" /><circle cx="16" cy="16" r="1.5" /></>,
  swap: <path d="M8 4v16M8 20l-3-3M8 20l3-3M16 20V4M16 4l-3 3M16 4l3 3" />,
  sound: <><path d="M4 9h3.5L12 5v14l-4.5-4H4z" /><path d="M15.5 9a4 4 0 0 1 0 6" /></>,
  mute: <><path d="M4 9h3.5L12 5v14l-4.5-4H4z" /><path d="m16 9.5 5 5M21 9.5l-5 5" /></>,
  camera: <><rect x="3.5" y="7" width="17" height="12" rx="2.5" /><circle cx="12" cy="13" r="3.2" /><path d="M9 7l1.2-2h3.6L15 7" /></>,
  toll: <path d="M4 20V9l5-4 5 4v11M14 13h6v7M7 13h4M7 16h4" />,
  curve: <path d="M6 20v-6a6 6 0 0 1 6-6h6M15 5l3 3-3 3" />,
  congestion: <><rect x="3" y="10" width="7" height="6" rx="1.5" /><rect x="14" y="10" width="7" height="6" rx="1.5" /><path d="M5 16v2M8 16v2M16 16v2M19 16v2" /></>,
  signal: <><rect x="8" y="3" width="8" height="18" rx="3" /><circle cx="12" cy="8" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="16" r="1.6" /></>,
  bump: <path d="M3 16c3 0 3-5 9-5s6 5 9 5" />,
  pin: <><path d="M12 21c-5-6-6.5-8.5-6.5-11.5a6.5 6.5 0 0 1 13 0C18.5 12.5 17 15 12 21z" /><circle cx="12" cy="9.5" r="2.2" /></>,
  plus: <path d="M12 6v12M6 12h12" />,
  arrowUp: <path d="M12 20V5M6 11l6-6 6 6" />,
  turnRight: <path d="M7 20v-7a4 4 0 0 1 4-4h7M15 5.5 18.5 9 15 12.5" />,
  gear: <><circle cx="12" cy="12" r="3.2" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" /><circle cx="12" cy="12" r="6.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  close: <path d="M7 7l10 10M17 7 7 17" />,
  chevronUp: <path d="m6 15 6-6 6 6" />,
  fuel: <><path d="M5 20V5.5A1.5 1.5 0 0 1 6.5 4h6A1.5 1.5 0 0 1 14 5.5V20M4 20h11M7.5 8h4" /><path d="M14 10h1.5a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0 3 0V8.5L18 6.5" /></>,
  bars: <path d="M7 19v-5M12 19V8M17 19v-8" />,
  // ---- 계기판 경고등 (직접 그린 단순 기호) ----
  oil: <><path d="M3 14h4l2-2h6l4-3 1.5 1-5 6H8z" /><path d="M9 12V9.5h3M10.5 9.5V8M21 15.5c0 1-.6 1.5-1.2 1.5s-1.2-.5-1.2-1.5.6-1.8 1.2-2.5c.6.7 1.2 1.5 1.2 2.5z" /></>,
  coolant: <><path d="M11 4v10.5a2.5 2.5 0 1 0 2 0V4" /><path d="M13 6.5h3M13 9.5h3M13 12.5h2M3.5 20c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" /></>,
  battery: <><rect x="3.5" y="7" width="17" height="12" rx="2" /><path d="M7 7V5M17 7V5M7 13h3M15 11.5v3M13.5 13h3" /></>,
  brake: <><circle cx="12" cy="12" r="6" /><path d="M12 9v3.5M12 15v.2M5 6.5a9 9 0 0 0 0 11M19 6.5a9 9 0 0 1 0 11" /></>,
  engine: <path d="M4 10v5M4 12.5h2M6 9h3V7h5v2h3l2 2h1.5v4H19l-2 2H9l-3-2.5z" />,
  tire: <><path d="M7 5.5a8 8 0 0 0 0 11M17 5.5a8 8 0 0 1 0 11M5.5 19h13" /><path d="M12 7v5M12 14.5v.2" /></>,
  // ---- 교통법규 ----
  trafficLight: <><rect x="8.5" y="3" width="7" height="18" rx="3" /><circle cx="12" cy="7.5" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="12" cy="16.5" r="1.4" /></>,
  child: <><circle cx="12" cy="5" r="2" /><path d="M12 7.5V14M8 10h8M12 14l-3 6M12 14l3 6" /></>,
  intersection: <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />,
  phoneOff: <><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M4 4l16 16" /></>,
  hipass: <path d="M4 20V8l4-3v15M8 11h12v9M11 14v6M14.5 14v6M18 14v6M3 20h18" />,
}

type Props = {
  name: IconName
  size?: number
  strokeWidth?: number
  className?: string
  title?: string
}

export function Icon({ name, size = 22, strokeWidth = 2, className, title }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  )
}
