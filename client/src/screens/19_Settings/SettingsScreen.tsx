// [프레임] 설정  |  주소: /settings
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Header, ListRow, Screen, Segmented, Slider, Toggle } from '../../components/ui'
import './SettingsScreen.css'

type Theme = 'system' | 'dark' | 'light'

// TODO(데이터): 설정값을 기기(localStorage)나 서버에 저장하고, 앱 시작 시 불러오기
const initialSettings = {
  voice: true,
  guideVolume: 70,
  coachVolume: 85,
  keepScreenOn: true,
  autoReport: true,
  theme: 'dark' as Theme,
}

function SettingRow({ title, sub, checked, onChange }: { title: string; sub?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="setting-row">
      <div>
        <div className="setting-row__title">{title}</div>
        {sub && <div className="setting-row__sub">{sub}</div>}
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  )
}

export function SettingsScreen() {
  const navigate = useNavigate()
  const [s, setS] = useState(initialSettings)
  const set = <K extends keyof typeof s>(k: K) => (v: (typeof s)[K]) => setS((p) => ({ ...p, [k]: v }))

  // TODO(기능): 약관·정책 웹페이지 열기
  const handleOpenPolicy = (_id: string) => {}
  // TODO(기능): 로그아웃 확인 팝업 → 토큰 삭제 → 로그인 화면
  const handleLogout = () => navigate('/login')
  // TODO(기능): 탈퇴 확인 팝업(비밀번호 재입력) → 탈퇴 API
  const handleWithdraw = () => {}

  return (
    <Screen padded>
      <Header title="설정" />

      <p className="section-label" style={{ margin: '4px 0 8px' }}>주행</p>
      <Card className="settings-card">
        <SettingRow title="음성 안내" sub="길안내와 코칭을 소리로 들려줘요" checked={s.voice} onChange={set('voice')} />
        <div className="setting-row setting-row--slider">
          <Slider label="길안내 볼륨" value={s.guideVolume} onChange={set('guideVolume')} />
        </div>
        <div className="setting-row setting-row--slider">
          <Slider label="코칭 음성 볼륨" value={s.coachVolume} onChange={set('coachVolume')} />
        </div>
        {/* TODO(기능): 켜두기 — Screen Wake Lock API 연결 */}
        <SettingRow title="주행 중 화면 켜두기" sub="꺼지면 위치를 받을 수 없어요" checked={s.keepScreenOn} onChange={set('keepScreenOn')} />
        <SettingRow title="도착하면 리포트로 자동 이동" sub="10초 뒤 넘어가요" checked={s.autoReport} onChange={set('autoReport')} />
      </Card>

      <p className="section-label" style={{ margin: '24px 0 8px' }}>화면</p>
      <Card className="settings-card" style={{ paddingTop: 12, paddingBottom: 14 }}>
        <div className="setting-row__title" style={{ marginBottom: 10 }}>테마</div>
        {/* TODO(기능): 라이트 테마 색상 변수 추가 후 <html data-theme>로 전환 */}
        <Segmented
          tone="dark"
          ariaLabel="테마"
          value={s.theme}
          onChange={set('theme')}
          options={[
            { value: 'system', label: '사용자 설정' },
            { value: 'dark', label: '다크' },
            { value: 'light', label: '라이트' },
          ]}
        />
        <p className="hint" style={{ marginTop: 10, borderTop: 'none' }}>주행 화면은 눈부심을 줄이기 위해 항상 다크로 보여요</p>
      </Card>

      <p className="section-label" style={{ margin: '24px 0 8px' }}>약관 및 정책</p>
      <Card className="settings-list" style={{ padding: '0 16px' }}>
        <ListRow title="서비스 이용약관" chevron onClick={() => handleOpenPolicy('service')} />
        <ListRow title="개인정보 처리방침" chevron onClick={() => handleOpenPolicy('privacy')} />
        <ListRow title="위치정보 이용약관" chevron onClick={() => handleOpenPolicy('location')} />
        <ListRow title="오픈소스 라이선스" chevron onClick={() => handleOpenPolicy('oss')} />
      </Card>

      <p className="section-label" style={{ margin: '24px 0 8px' }}>계정</p>
      <Card className="settings-list" style={{ padding: '0 16px' }}>
        <ListRow title="비밀번호 변경" chevron onClick={() => navigate('/find-password')} />
        <ListRow title="로그아웃" chevron onClick={handleLogout} />
        <ListRow title="회원 탈퇴" danger onClick={handleWithdraw} />
      </Card>

      <p className="hint" style={{ textAlign: 'center', margin: '24px 0 32px' }}>앱 버전 0.2.0</p>
    </Screen>
  )
}
