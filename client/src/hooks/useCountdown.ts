import { useEffect, useState } from 'react'

/**
 * 초 단위 카운트다운. 인증번호 3:00 타이머, 도착 화면 10초 자동 이동에 써요.
 * running이 false면 멈춰 있어요.
 */
export function useCountdown(seconds: number, running = true, onDone?: () => void) {
  const [left, setLeft] = useState(seconds)

  useEffect(() => {
    if (!running) return
    if (left <= 0) {
      onDone?.()
      return
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [left, running]) // eslint-disable-line react-hooks/exhaustive-deps

  const mmss = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`
  return { left, mmss, reset: () => setLeft(seconds) }
}
