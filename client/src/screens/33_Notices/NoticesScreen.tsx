// [프레임] 공지사항  |  주소: /notices
// 펼친 공지는 카드 하나로, 접힌 공지는 한 카드 안에 줄로 묶어서 보여줘요.
import { useState } from 'react'
import { Header, Icon, Screen } from '../../components/ui'
import { mockNotices } from '../../mocks/data'
import './NoticesScreen.css'

type Notice = (typeof mockNotices)[number]

export function NoticesScreen() {
  // TODO(데이터): 공지 목록 API로 바꾸기
  const [openIds, setOpenIds] = useState<string[]>([mockNotices[0].id])
  const toggle = (id: string) => setOpenIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  // 연속으로 접힌 공지끼리 묶기
  const groups: { open: boolean; items: Notice[] }[] = []
  for (const n of mockNotices) {
    const open = openIds.includes(n.id)
    const last = groups[groups.length - 1]
    if (!open && last && !last.open) last.items.push(n)
    else groups.push({ open, items: [n] })
  }

  return (
    <Screen padded>
      <Header title="공지사항" />
      <div style={{ paddingBottom: 32 }}>
        {groups.map((g) =>
          g.open ? (
            g.items.map((n) => (
              <article key={n.id} className="nt-card nt-open">
                <div className="nt-open__meta">
                  {'isNew' in n && n.isNew && <span className="nt-new">NEW</span>}
                  <span>{n.date}</span>
                </div>
                <h2>{n.title}</h2>
                <ul>
                  {n.lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
                <button className="nt-fold" onClick={() => toggle(n.id)} aria-expanded>
                  접기 <Icon name="chevronUp" size={14} strokeWidth={2.4} />
                </button>
              </article>
            ))
          ) : (
            <div key={g.items[0].id} className="nt-card">
              {g.items.map((n) => (
                <button key={n.id} className="nt-row" onClick={() => toggle(n.id)} aria-expanded={false}>
                  <div>
                    <b>{n.title}</b>
                    <span>{n.date}</span>
                  </div>
                  <Icon name="chevronDown" size={18} />
                </button>
              ))}
            </div>
          ),
        )}
      </div>
    </Screen>
  )
}
