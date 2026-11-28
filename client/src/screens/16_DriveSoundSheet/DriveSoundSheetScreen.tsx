// [프레임] 주행 · 소리 설정 시트  |  주소: /drive/sound
// 주행 화면(우회전 안내 장면) 위에 '소리 설정' 시트가 올라온 상태예요.
// TODO(확인 필요): 주행 화면에서 이 시트를 여는 버튼 위치가 디자인에 없어요
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomSheet, Slider, Toggle } from '../../components/ui'
import { DriveScreen } from '../12_Drive/DriveScreen'

export function DriveSoundSheetScreen() {
  const navigate = useNavigate()
  // TODO(데이터): 설정 화면과 같은 값을 쓰도록 전역 상태(예: Context)로 옮기기
  const [guideVol, setGuideVol] = useState(70)
  const [coachVol, setCoachVol] = useState(85)
  const [guideVoice, setGuideVoice] = useState(true)
  const [coachVoice, setCoachVoice] = useState(true)

  const handleClose = () => navigate('/drive', { replace: true })

  return (
    <DriveScreen scene="turn">
      <BottomSheet backdrop handle={false} onClose={handleClose} label="소리 설정">
        <h2 className="sheet__title" style={{ margin: '16px 0 4px' }}>소리 설정</h2>
        <Slider label="길안내 볼륨" value={guideVol} onChange={setGuideVol} />
        <Slider label="코칭 음성 볼륨" value={coachVol} onChange={setCoachVol} />
        <div className="setting-row" style={{ marginTop: 14 }}>
          <div>
            <div className="setting-row__title">길안내 음성</div>
            <div className="setting-row__sub">회전, 차선 안내</div>
          </div>
          <Toggle checked={guideVoice} onChange={setGuideVoice} label="길안내 음성" />
        </div>
        <div className="setting-row" style={{ borderTop: 'none' }}>
          <div>
            <div className="setting-row__title">코칭 음성</div>
            <div className="setting-row__sub">탄력주행 안내</div>
          </div>
          <Toggle checked={coachVoice} onChange={setCoachVoice} label="코칭 음성" />
        </div>
      </BottomSheet>
    </DriveScreen>
  )
}
