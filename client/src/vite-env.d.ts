/// <reference types="vite/client" />

// client/.env 에 넣는 값 (Vite는 VITE_ 로 시작하는 값만 화면 코드에서 읽을 수 있어요)
interface ImportMetaEnv {
  /** 카카오 JavaScript 키 (지도 표시용) */
  readonly VITE_KAKAO_JS_KEY?: string
  /** 서버 주소. 비우면 http://localhost:4000 */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
