// [프레임] 로딩 화면  |  주소: /splash
// 앱을 켜면 처음 보이는 화면. 로고 아래 '알고 계셨나요?' 팁을 보여줘요.
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockTips } from '../../mocks/data'
import './SplashScreen.css'

const SPLASH_MS = 2500

export function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    // TODO(기능): 로그인 토큰 확인 → 있으면 /main, 처음이면 /guide/1, 없으면 /login
    const t = setTimeout(() => navigate('/login', { replace: true }), SPLASH_MS)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <main className="screen splash">
      <div className="splash__center">
        {/* TODO(디자인): 로고 · 워드마크가 나오면 이 칸에 넣기 (지금은 빈 자리) */}
        <div className="splash__logo" role="img" aria-label="FuelCoach" />
      </div>
      <section className="splash__tips" aria-label="알고 계셨나요?">
        <p className="splash__tips-title">알고 계셨나요?</p>
        {mockTips.map((t) => (
          <div key={t.tag} className="splash__tip">
            <span className="splash__tag">{t.tag}</span>
            <p>{t.text}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
