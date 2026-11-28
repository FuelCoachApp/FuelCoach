// [프레임] 목적지 검색  |  주소: /search
import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Icon } from '../../components/ui'
import { mockSearchPlaces, mockSearchRecent } from '../../mocks/data'
import './SearchScreen.css'

/** 검색어와 같은 부분을 민트색으로 표시 */
function highlight(text: string, query: string): ReactNode {
  const i = query ? text.indexOf(query) : -1
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  )
}

export function SearchScreen() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('천안')
  const q = query.trim()
  // TODO(기능): 카카오 장소 검색 API로 바꾸기 (입력 후 0.3초 쉬면 검색)
  const recent = mockSearchRecent.filter((r) => !q || r.name.includes(q))
  const places = q ? mockSearchPlaces.filter((p) => p.name.includes(q)) : []

  // TODO(기능): 고른 장소를 목적지로 경로 추천 화면 열기
  const handlePick = (_id: string) => navigate('/route')

  return (
    <main className="screen search">
      <div className="search__bar">
        <button className="search__back" onClick={() => navigate(-1)} aria-label="뒤로 가기">
          <Icon name="back" size={26} strokeWidth={2.2} />
        </button>
        <label className="search__field">
          <Icon name="search" size={20} strokeWidth={2.2} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="어디로 갈까요?" autoFocus aria-label="목적지 검색" />
          {query && (
            <button className="search__clear" onClick={() => setQuery('')} aria-label="지우기">
              <Icon name="close" size={12} strokeWidth={2.8} />
            </button>
          )}
        </label>
      </div>

      {recent.length > 0 && (
        <section>
          <h2 className="search__section">최근</h2>
          {recent.map((r) => (
            <button key={r.id} className="search-row" onClick={() => handlePick(r.id)}>
              <Icon name="clock" size={22} />
              <div className="search-row__body">
                <b>{highlight(r.name, q)}</b>
                <span>{r.detail}</span>
              </div>
              <Badge tone="mint-soft">{r.tag}</Badge>
            </button>
          ))}
        </section>
      )}

      {places.length > 0 && (
        <section>
          <h2 className="search__section">장소</h2>
          {places.map((p) => (
            <button key={p.id} className="search-row" onClick={() => handlePick(p.id)}>
              <Icon name="pin" size={22} />
              <div className="search-row__body">
                <b>{highlight(p.name, q)}</b>
                <span>{p.detail}</span>
              </div>
            </button>
          ))}
        </section>
      )}
    </main>
  )
}
