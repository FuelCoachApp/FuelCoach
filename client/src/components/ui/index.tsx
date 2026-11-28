// 여러 화면에서 반복해서 쓰는 기본 UI 요소 모음
// 사용 예: import { Button, TextField } from '../components/ui'
import { useId, type CSSProperties, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import './ui.css'

export { Icon } from './Icon'
export type { IconName } from './Icon'

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

/* ---------------- 화면 틀 ---------------- */
type ScreenProps = {
  children: ReactNode
  padded?: boolean
  withTabBar?: boolean
  footer?: ReactNode
  className?: string
}
/** 모든 화면을 감싸는 틀. 최대 폭 430px, 노치·홈 바 여백 처리 */
export function Screen({ children, padded, withTabBar, footer, className }: ScreenProps) {
  return (
    <main className={cx('screen', padded && 'screen--padded', withTabBar && 'screen--with-tabbar', className)}>
      <div className="screen__body">{children}</div>
      {footer && <div className="screen__footer">{footer}</div>}
    </main>
  )
}

/* ---------------- 헤더 ---------------- */
type HeaderProps = {
  title: string
  showBack?: boolean
  onBack?: () => void
  right?: ReactNode
}
export function Header({ title, showBack = true, onBack, right }: HeaderProps) {
  const navigate = useNavigate()
  return (
    <header className="header">
      <div className="header__left">
        {showBack && (
          <button className="header__back" onClick={onBack ?? (() => navigate(-1))} aria-label="뒤로 가기">
            <Icon name="back" size={24} strokeWidth={2.4} />
          </button>
        )}
        <h1 className="header__title" style={showBack ? undefined : { paddingLeft: 6 }}>
          {title}
        </h1>
      </div>
      {right}
    </header>
  )
}

/* ---------------- 버튼 ---------------- */
type ButtonProps = {
  children: ReactNode
  /** primary: 민트로 채움 · outline: 민트 테두리+흰 글씨 · outline-mint: 민트 테두리+민트 글씨 · secondary: 회색 */
  variant?: 'primary' | 'outline' | 'outline-mint' | 'secondary'
  size?: 'md' | 'sm'
  onClick?: () => void
  disabled?: boolean
  /** 서버 응답을 기다리는 동안 true로 두면 로딩 표시가 나와요 */
  loading?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  type?: 'button' | 'submit'
  className?: string
  style?: CSSProperties
}
export function Button({
  children, variant = 'outline', size = 'md', onClick, disabled, loading, leading, trailing, type = 'button', className, style,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx('btn', `btn--${variant}`, size === 'sm' && 'btn--sm', className)}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      style={style}
    >
      {loading ? <span className="btn__spinner" /> : leading}
      {children}
      {trailing && <span className="btn__trailing">{trailing}</span>}
    </button>
  )
}

/* ---------------- 입력창 ---------------- */
type TextFieldProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  type?: 'text' | 'password' | 'email'
  /** 입력창 아래 안내 문구 */
  help?: string
  /** 'success'면 초록 ✓, 'error'면 빨간 글씨로 표시 */
  status?: 'default' | 'success' | 'error'
  /** 입력창 안 오른쪽 글자 (예: 3:00 타이머) */
  trailing?: ReactNode
  /** 입력창 오른쪽 버튼 (예: 중복 확인) */
  addon?: { label: string; onClick: () => void; tone?: 'mint' | 'neutral' }
  autoComplete?: string
}
export function TextField({
  label, placeholder, value, onChange, type = 'text', help, status = 'default', trailing, addon, autoComplete,
}: TextFieldProps) {
  const id = useId()
  return (
    <div className="field">
      {label && <label className="field-label" htmlFor={id}>{label}</label>}
      <div className="field__row">
        <div className={cx('field__box', status === 'error' && 'field__box--error')}>
          <input
            id={id}
            className="field__input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            autoComplete={autoComplete}
          />
          {trailing && <span className="field__trailing">{trailing}</span>}
        </div>
        {addon && (
          <button type="button" className={cx('field__addon', addon.tone === 'neutral' && 'field__addon--neutral')} onClick={addon.onClick}>
            {addon.label}
          </button>
        )}
      </div>
      {help && (
        <p className={cx('field__help', status === 'success' && 'field__help--success', status === 'error' && 'field__help--error')}>
          {status === 'success' && '✓ '}
          {help}
        </p>
      )}
    </div>
  )
}

/* ---------------- 드롭다운 ---------------- */
type SelectProps = {
  label?: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
  placeholder?: string
}
export function Select({ label, value, options, onChange, placeholder }: SelectProps) {
  const id = useId()
  return (
    <div className="select">
      {label && <label className="field-label" htmlFor={id}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <select id={id} className="select__native" value={value} onChange={(e) => onChange(e.target.value)}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="select__icon"><Icon name="chevronDown" size={18} /></span>
      </div>
    </div>
  )
}

/* ---------------- 탭 ---------------- */
type SegmentedProps<T extends string> = {
  options: { value: T; label: ReactNode }[]
  value: T
  onChange: (v: T) => void
  tone?: 'surface' | 'dark'
  ariaLabel?: string
}
export function Segmented<T extends string>({ options, value, onChange, tone = 'surface', ariaLabel }: SegmentedProps<T>) {
  return (
    <div className={cx('segmented', tone === 'dark' && 'segmented--dark')} role="tablist" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={o.value === value}
          className={cx('segmented__item', o.value === value && 'segmented__item--on')}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function UnderlineTabs<T extends string>({ options, value, onChange }: Omit<SegmentedProps<T>, 'tone'>) {
  return (
    <div className="underline-tabs" role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={o.value === value}
          className={cx('underline-tabs__item', o.value === value && 'underline-tabs__item--on')}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/* ---------------- 선택 칩 ---------------- */
type Chip<T extends string> = { value: T; label: ReactNode; trailing?: ReactNode }
type ChoiceChipsProps<T extends string> = {
  options: Chip<T>[]
  value: T | null
  onChange: (v: T) => void
  fit?: boolean
  /** true면 한 줄에 모두 놓아요(줄바꿈 안 함) */
  nowrap?: boolean
  style?: CSSProperties
}
export function ChoiceChips<T extends string>({ options, value, onChange, fit, nowrap, style }: ChoiceChipsProps<T>) {
  return (
    <div className={cx('chips', nowrap && 'chips--nowrap')} role="radiogroup" style={style}>
      {options.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={o.value === value}
          className={cx('chip', fit && 'chip--fit', o.value === value && 'chip--on')}
          onClick={() => onChange(o.value)}
        >
          {o.label}
          {o.trailing}
        </button>
      ))}
    </div>
  )
}

/* ---------------- 카드·목록 ---------------- */
export function Card({ children, pad, style, className }: { children: ReactNode; pad?: boolean; style?: CSSProperties; className?: string }) {
  return <div className={cx('card', pad && 'card--pad', className)} style={style}>{children}</div>
}

type ListRowProps = {
  title: ReactNode
  sub?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  chevron?: boolean
  onClick?: () => void
  danger?: boolean
}
export function ListRow({ title, sub, leading, trailing, chevron, onClick, danger }: ListRowProps) {
  const content = (
    <>
      {leading}
      <div className="list-row__body">
        <div className="list-row__title" style={danger ? { color: 'var(--danger)', fontWeight: 500 } : undefined}>{title}</div>
        {sub && <div className="list-row__sub">{sub}</div>}
      </div>
      {trailing}
      {chevron && <span className="list-row__trailing"><Icon name="chevron" size={20} /></span>}
    </>
  )
  return onClick ? (
    <button className="list-row" onClick={onClick}>{content}</button>
  ) : (
    <div className="list-row">{content}</div>
  )
}

export function IconTile({ name, color = 'var(--mint)', size = 40, bg }: { name: IconName; color?: string; size?: number; bg?: string }) {
  return (
    <span className="icon-tile" style={{ width: size, height: size, color, background: bg }}>
      <Icon name={name} size={Math.round(size * 0.5)} />
    </span>
  )
}

/* ---------------- 토글·슬라이더·체크박스 ---------------- */
export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={cx('toggle', checked && 'toggle--on')}
      onClick={() => onChange(!checked)}
    />
  )
}

export function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="slider">
      <div className="slider__head">
        <span className="slider__label">{label}</span>
        <span className="slider__value">{value}%</span>
      </div>
      <input
        className="slider__input"
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--fill': `${value}%` } as CSSProperties}
      />
    </div>
  )
}

export function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button role="checkbox" aria-checked={checked} aria-label={label} className={cx('checkbox', checked && 'checkbox--on')} onClick={() => onChange(!checked)}>
      {checked && <Icon name="check" size={15} strokeWidth={3} />}
    </button>
  )
}

/* ---------------- 바텀시트 ---------------- */
type SheetProps = {
  children: ReactNode
  /** 뒤 화면을 어둡게 덮을지 */
  backdrop?: boolean
  onClose?: () => void
  /** 처음부터 열려 있는 시트(애니메이션 없음) */
  flat?: boolean
  style?: CSSProperties
  label?: string
  /** 위쪽 손잡이(회색 막대) 표시 여부 */
  handle?: boolean
}
export function BottomSheet({ children, backdrop, onClose, flat, style, label, handle = true }: SheetProps) {
  return (
    <>
      {backdrop && <div className="sheet-backdrop" onClick={onClose} />}
      <section className={cx('sheet', flat && 'sheet--flat')} style={style} role={backdrop ? 'dialog' : undefined} aria-modal={backdrop || undefined} aria-label={label}>
        {handle && <div className="sheet__handle" />}
        {children}
      </section>
    </>
  )
}

/* ---------------- 하단 탭바 ---------------- */
const TABS = [
  { path: '/main', label: '홈', icon: 'home' as const },
  { path: '/report', label: '리포트', icon: 'chart' as const },
  { path: '/my', label: '나의 정보', icon: 'user' as const },
]
export function TabBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (
    <nav className="tabbar" aria-label="주요 메뉴">
      {TABS.map((t) => {
        const on = pathname.startsWith(t.path)
        return (
          <button key={t.path} className={cx('tabbar__item', on && 'tabbar__item--on')} onClick={() => navigate(t.path)} aria-current={on ? 'page' : undefined}>
            <Icon name={t.icon} size={24} strokeWidth={on ? 2.4 : 2} />
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}

/* ---------------- 기타 ---------------- */
export function Badge({ children, tone = 'mint', style }: { children: ReactNode; tone?: 'mint' | 'mint-soft' | 'dark' | 'muted' | 'orange' | 'outline-mint'; style?: CSSProperties }) {
  return <span className={cx('badge', `badge--${tone}`)} style={style}>{children}</span>
}

export function InfoNote({ children, bare, warn }: { children: ReactNode; bare?: boolean; warn?: boolean }) {
  return (
    <div className={cx('info-note', bare && 'info-note--bare', warn && 'info-note--warn')}>
      <span className="info-note__icon"><Icon name="info" size={16} /></span>
      <div>{children}</div>
    </div>
  )
}

export function CircleButton({ icon, onClick, label, style }: { icon: IconName; onClick?: () => void; label: string; style?: CSSProperties }) {
  return (
    <button className="circle-btn" onClick={onClick} aria-label={label} style={style}>
      <Icon name={icon} size={22} />
    </button>
  )
}
