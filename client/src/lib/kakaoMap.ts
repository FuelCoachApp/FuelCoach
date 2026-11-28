// 카카오 지도 SDK를 한 번만 불러오는 함수
// - 키는 client/.env 의 VITE_KAKAO_JS_KEY (JavaScript 키) 를 써요. REST 키를 넣으면 안 돼요.
// - JavaScript 키는 원래 브라우저에 보이는 키라서, 카카오 콘솔의 [플랫폼 > Web] 도메인 등록으로 보호해요.

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: any
  }
}

export type MapLoadError = 'NO_KEY' | 'LOAD_FAIL'

let loading: Promise<any> | null = null

export function loadKakaoMap(): Promise<any> {
  if (window.kakao?.maps?.LatLng) return Promise.resolve(window.kakao)
  if (loading) return loading

  const key = import.meta.env.VITE_KAKAO_JS_KEY
  if (!key) return Promise.reject(new Error('NO_KEY' satisfies MapLoadError))

  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(key)}&autoload=false`
    script.async = true
    script.onload = () => {
      if (!window.kakao?.maps) {
        loading = null
        reject(new Error('LOAD_FAIL' satisfies MapLoadError))
        return
      }
      window.kakao.maps.load(() => resolve(window.kakao))
    }
    // 키가 틀리거나, 도메인이 등록 안 됐거나, 카카오맵 사용 설정이 꺼져 있으면 여기로 와요.
    script.onerror = () => {
      loading = null
      script.remove()
      reject(new Error('LOAD_FAIL' satisfies MapLoadError))
    }
    document.head.appendChild(script)
  })
  return loading
}
