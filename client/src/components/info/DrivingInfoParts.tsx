// 운전 정보 두 프레임(계기판 경고등 · 교통법규)이 함께 쓰는 머리 부분
import { useNavigate } from 'react-router-dom'
import { Header, Segmented } from '../ui'

export function DrivingInfoHead({ current }: { current: 'lights' | 'laws' }) {
  const navigate = useNavigate()
  return (
    <>
      <Header title="운전 정보" />
      <p className="page-desc" style={{ margin: '4px 0 14px' }}>처음 운전하는 분을 위한 기본 정보예요.</p>
      <Segmented
        ariaLabel="운전 정보 종류"
        value={current}
        onChange={(v) => navigate(v === 'lights' ? '/driving-info' : '/driving-info/laws', { replace: true })}
        options={[
          { value: 'lights', label: '계기판 경고등' },
          { value: 'laws', label: '교통법규' },
        ]}
      />
    </>
  )
}
