import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 스타일은 App보다 먼저 불러와요 (화면별 CSS가 공통 CSS를 덮어쓸 수 있도록)
import './styles/global.css'
import './components/ui/ui.css'
import './styles/screens-shared.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
