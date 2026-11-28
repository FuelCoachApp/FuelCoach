// ================================================================
// 임시 데이터(목업)
// 지금은 화면을 보여주기 위한 가짜 값이에요.
// 서버·API를 연결할 때 이 파일의 값을 실제 응답으로 바꾸면,
// 화면 코드는 거의 건드리지 않아도 돼요.
// ================================================================

/* ---------- 계정 ---------- */
export const mockAccount = {
  maskedId: 'beom****23',
  joinedAt: '2026.11.12',
}

/* ---------- 내 차 ---------- */
export type VehicleType = 'sedan' | 'suv' | 'compact' | 'van'
export type Fuel = 'gasoline' | 'diesel' | 'lpg' | 'hybrid'
export type HybridFuel = 'gasoline' | 'diesel' | 'lpg'

export const VEHICLE_TYPES: { value: VehicleType; label: string }[] = [
  { value: 'sedan', label: '승용차' },
  { value: 'suv', label: 'SUV' },
  { value: 'compact', label: '경차' },
  { value: 'van', label: '승합차' },
]

export const FUELS: { value: Fuel; label: string }[] = [
  { value: 'gasoline', label: '휘발유' },
  { value: 'diesel', label: '경유' },
  { value: 'lpg', label: 'LPG' },
  { value: 'hybrid', label: '하이브리드' },
]

export const HYBRID_FUELS: { value: HybridFuel; label: string; short: string }[] = [
  { value: 'gasoline', label: '휘발유 하이브리드', short: '휘발유' },
  { value: 'diesel', label: '경유 하이브리드', short: '경유' },
  { value: 'lpg', label: 'LPG 하이브리드', short: 'LPG' },
]

// TODO(데이터): 공공데이터포털 '자동차 표준연비' 데이터로 교체
export const MANUFACTURERS = [
  { value: 'hyundai', label: '현대' },
  { value: 'kia', label: '기아' },
  { value: 'genesis', label: '제네시스' },
]
export const MODELS: Record<string, { value: string; label: string; avgKmL: number; tollClass: string }[]> = {
  hyundai: [
    { value: 'avante-cn7-26', label: '아반떼 CN7 (26년)', avgKmL: 15.2, tollClass: '1종(소형차)' },
    { value: 'avante-cn7', label: '아반떼 (CN7)', avgKmL: 15.2, tollClass: '1종(소형차)' },
  ],
  kia: [{ value: 'sorento-mq4', label: '쏘렌토 MQ4', avgKmL: 12.1, tollClass: '1종(소형차)' }],
  genesis: [{ value: 'g80', label: 'G80', avgKmL: 10.5, tollClass: '1종(소형차)' }],
}

/* ---------- 주행할 차량 선택 ---------- */
export const mockVehicles = [
  { id: 'v1', name: '아반떼 CN7', tag: '본인 차량', spec: '하이브리드 · 휘발유 · 통행료 1종', lastUsed: '최근 운전 · 오늘', mine: true },
  { id: 'v2', name: '쏘렌토 MQ4', tag: '가족 차', spec: '경유 · 통행료 1종', lastUsed: '최근 운전 · 11월 16일', mine: false },
]

/* ---------- 즐겨찾기·장소 ---------- */
export const mockFavoritePlaces = [
  { id: 'p1', name: '학교', detail: '2.4km · 약 7분', address: '백석대학교 · 2.4km' },
  { id: 'p2', name: '천안아산역', detail: '8.1km · 약 16분', address: '8.1km' },
]
export const mockRecentPlaces = [
  { id: 'r1', name: '천안종합터미널', detail: '4.3km · 약 11분' },
  { id: 'r2', name: '천안시청', detail: '5.0km · 약 13분' },
]
export const mockHome = null as null | { name: string; address: string } // 집이 아직 등록 안 됨

export const mockFavoriteRoutes = [
  { id: 'fr1', name: '학교 가는 길 (시청 경유)', path: '내 위치 → 천안시청 → 백석대학교', tag: '추천 경로' },
  { id: 'fr2', name: '주말 장보기', path: '내 위치 → 천안 ○○마트 (예시)', tag: '무료 도로' },
]

export const mockPlaceSearchResult = {
  name: '햇살마을아파트 101동',
  address: '충남 천안시 동남구 ○○로 00 (예시)',
}

/* ---------- 출발 시간 추천 ---------- */
export const mockDepartureOptions = [
  { id: 'now', label: '지금', offset: '지금', depart: '오후 2:02 출발', arrive: '오후 2:14 도착', minutes: 12, cost: 760, saving: 0 },
  { id: '15', label: '15분 뒤', offset: '+15', depart: '오후 2:17 출발', arrive: '오후 2:27 도착', minutes: 10, cost: 700, saving: 60 },
  { id: '30', label: '30분 뒤', offset: '+30', depart: '오후 2:32 출발', arrive: '오후 2:43 도착', minutes: 11, cost: 730, saving: 30 },
  { id: '60', label: '1시간 뒤', offset: '+1h', depart: '오후 3:02 출발', arrive: '오후 3:16 도착', minutes: 14, cost: 790, saving: 0 },
]

/* ---------- 주행 ---------- */
export const mockDestination = { name: '백석대학교', area: '천안시 동남구', arrive: '오후 2:14', remainKm: 4.8 }

export type Maneuver = 'ic' | 'right'
export const mockGuidance = {
  ic: { maneuver: 'ic' as Maneuver, title: '천안IC', toll: '1,200원', distance: '300m', next: '우회전 1.2km', lanes: ['up', 'up', 'right', 'right'] as const, activeLanes: [0, 1] },
  right: { maneuver: 'right' as Maneuver, title: '백석대 · 천안대로 방면', toll: '', distance: '300m', next: '우회전 1.2km', lanes: ['up', 'up', 'right', 'right'] as const, activeLanes: [2, 3] },
}

export const mockSpeed = { limit: 50, current: 48 }
export const mockHipass = { label: '천안IC', fee: '1,200원' }

export const mockAltRoutes = [
  { id: 'current', name: '현재 경로', arrive: '오후 2:14 도착', detail: '' },
  { id: 'free', name: '무료 도로', arrive: '오후 2:18 도착', detail: '5.2km · 통행료 0원' },
  { id: 'fast', name: '시간 우선', arrive: '오후 2:16 도착', detail: '4.8km · 통행료 1,200원' },
]

/* ---------- 도착 ---------- */
export const mockTripSummary = { duration: '12분', distance: '5.8km', saving: '3,321원' }

/* ---------- 안심주행 ---------- */
export const mockNextCoaching = { label: '교차로', distance: '800m' }

/* ================================================================
   21~35번 프레임용 임시 데이터
   ================================================================ */

/* ---------- 로딩 화면 '알고 계셨나요?' ---------- */
export const mockTips = [
  { tag: '탄력주행', text: '가속 페달에서 발을 떼고, 차가 가진 속도로 굴러가게 두는 운전이에요.' },
  { tag: '퓨얼컷', text: 'D단에서 발을 떼고 달리면 엔진이 연료 분사를 멈춰요. 이때 연료 사용량은 0이에요.' },
]

/* ---------- 나의 정보 ---------- */
export const mockProfile = {
  nickname: '연비왕',
  maskedEmail: 'fuel****@gmail.com',
  totalKm: '128km',
  totalSaving: '약 1,020원',
  totalFuel: '1.2L',
}
export const mockMyCar = {
  type: '승용차',
  makerModel: '현대 아반떼',
  fuel: '하이브리드 · 휘발유',
  tollClass: '1종(소형차)',
}
export const mockFuelPrice = { label: '휘발유 1,700원/L' }

/* ---------- 내 차 관리 ---------- */
export const mockManagedCars = [
  { id: 'v1', name: '아반떼 CN7', spec: '하이브리드 · 휘발유 · 통행료 1종', km: '128km', saving: '약 1,020원 절약' },
  { id: 'v2', name: '쏘렌토 MQ4', spec: '경유 · 통행료 1종', km: '42km', saving: '약 310원 절약', tag: '가족 차' },
]

/* ---------- 공지사항 ---------- */
export const mockNotices = [
  {
    id: 'n3', isNew: true, title: 'v0.2.0 업데이트 안내', date: '2026.12.20 (예시)',
    lines: [
      '경로마다 총 이동 비용(기름값 + 통행료)을 보여줘요',
      '톨게이트 · 급커브 코칭이 추가됐어요',
      '리포트에서 달력으로 날짜별 절감액을 볼 수 있어요',
      '내 차를 여러 대 등록할 수 있어요',
    ],
  },
  { id: 'n2', title: 'v0.1.1 코칭 안내 시점 개선', date: '2026.12.05 (예시)', lines: ['코칭 음성이 조금 더 일찍 나오도록 바꿨어요 (예시)'] },
  { id: 'n1', title: '베타 서비스 오픈 안내', date: '2026.11.30 (예시)', lines: ['FuelCoach 베타 서비스를 시작해요 (예시)'] },
]

/* ---------- 검색 ---------- */
export const mockSearchRecent = [
  { id: 's1', name: '천안아산역', detail: '아산시 배방읍 · 8.1km', tag: '최근' },
  { id: 's2', name: '천안종합터미널', detail: '천안시 동남구 · 4.3km', tag: '3회 방문' },
]
export const mockSearchPlaces = [
  { id: 'p1', name: '천안시청', detail: '천안시 서북구 · 5.0km' },
  { id: 'p2', name: '천안역', detail: '천안시 동남구 · 3.6km' },
  { id: 'p3', name: '천안삼거리공원', detail: '천안시 동남구 · 4.9km' },
  { id: 'p4', name: '천안종합운동장', detail: '천안시 서북구 · 6.2km' },
]

/* ---------- 경로 추천 ---------- */
export const mockRoutePoints = { start: '내 위치', via: '천안시청 (경유)', end: '백석대학교' }
export const mockGasPrices = [
  { id: 'g1', price: '1,672', left: '27%', top: '58%' },
  { id: 'g2', price: '1,659', left: '60%', top: '48%' },
]
export const mockRouteOptions = [
  { id: 'rec', label: '추천', arrive: '오후 2:14 도착', detail: '12분 · 5.8km · 코칭 5곳', cost: '통행료 1,200', costSub: '기름값  5,323' },
  { id: 'fast', label: '최소 시간', arrive: '오후 2:13 도착', detail: '11분 · 6.4km · 코칭 3곳', cost: '약 2,040원', costSub: '840 + 1,200' },
  { id: 'short', label: '최단 거리', arrive: '오후 2:15 도착', detail: '13분 · 5.2km · 코칭 6곳', cost: '약 720원', costSub: '720 + 0' },
]

/* ---------- 주행 리포트 ---------- */
export const mockLatestTrip = {
  dateLabel: '11월 22일 (일) · 집 → 학교',
  ecoScore: 85,
  vsLast: '같은 경로 지난번보다 6점',
  events: '급가속 0회 · 급감속 1회',
  saving: '68',
  fuel: '0.04',
  fuelBasis: '휘발유 1,700원/L 기준',
  total: { fuel: '1.2L', efficiency: '+8%' },
}
export const mockMonth = {
  year: 2026,
  month: 11,
  today: 25,
  trips: 12,
  fuelSaved: '0.75L',
  vsLastMonth: '+210원',
  /** 날짜 → 그날 절감 금액(원) */
  dailySaving: { 3: 120, 4: 96, 6: 140, 10: 88, 11: 132, 13: 150, 17: 104, 18: 126, 20: 90, 22: 122, 24: 110 } as Record<number, number>,
}
export const mockTripsByDay: Record<number, { id: string; name: string; detail: string; saving: string }[]> = {
  22: [
    { id: 't1', name: '집 → 학교', detail: '12분 · 5.8km · 에코 85점', saving: '약 68원' },
    { id: 't2', name: '학교 → 집', detail: '14분 · 5.9km · 에코 79점', saving: '약 54원' },
  ],
}

/* ---------- 운전 정보 ---------- */
export type WarningLevel = 'stop' | 'soon'
export const mockWarningLights: { id: string; icon: 'oil' | 'coolant' | 'battery' | 'brake' | 'engine' | 'tire'; level: WarningLevel; title: string; desc: string }[] = [
  { id: 'oil', icon: 'oil', level: 'stop', title: '엔진오일 압력', desc: '오일 압력이 낮아요. 안전한 곳에 바로 멈추세요.' },
  { id: 'coolant', icon: 'coolant', level: 'stop', title: '냉각수 온도', desc: '엔진이 과열됐어요. 멈추고 식혀 주세요.' },
  { id: 'battery', icon: 'battery', level: 'stop', title: '배터리 충전', desc: '충전 계통 이상. 전기 장치를 줄이고 점검.' },
  { id: 'brake', icon: 'brake', level: 'stop', title: '브레이크', desc: '주차 브레이크 또는 브레이크액을 확인하세요.' },
  { id: 'engine', icon: 'engine', level: 'soon', title: '엔진 점검', desc: '엔진 · 배기 계통 이상. 정비소에서 점검.' },
  { id: 'tire', icon: 'tire', level: 'soon', title: '타이어 공기압', desc: '공기압이 낮아요. 확인하고 채워 주세요.' },
]
export const mockTrafficLaws: { id: string; icon: 'turnRight' | 'trafficLight' | 'child' | 'intersection' | 'phoneOff' | 'hipass'; tone: 'mint' | 'amber' | 'red'; title: string; soz?: boolean; desc: string; penalty?: string }[] = [
  { id: 'l1', icon: 'turnRight', tone: 'mint', title: '우회전할 때 일시정지', desc: '보행자가 횡단보도를 건너거나 건너려 하면 신호와 상관없이 멈춰요. 차량 신호가 빨간불이면 정지선에서 먼저 멈춘 뒤 우회전해요.', penalty: '범칙금 6만원 · 벌점 10점' },
  { id: 'l2', icon: 'trafficLight', tone: 'amber', title: '노란불이면 멈추기', soz: true, desc: '정지선을 넘기 전에 노란불로 바뀌면 멈춰야 해요. 멈추기 어려웠어도 교차로에 들어가면 신호위반이에요 (2024 대법원 판결).', penalty: '범칙금 6만원 · 벌점 15점 · 단속카메라 과태료 7만원' },
  { id: 'l3', icon: 'child', tone: 'red', title: '어린이보호구역 30km', soz: true, desc: '대부분 30km, 일부는 20km예요. 시간대에 따라 제한속도가 바뀌는 구간도 있으니 표지판을 확인하세요. 사고가 나면 민식이법으로 더 무겁게 처벌돼요.' },
  { id: 'l4', icon: 'intersection', tone: 'mint', title: '교차로 꼬리물기 금지', desc: '초록불이어도 앞이 막혀 교차로 안에서 멈출 것 같으면 들어가지 않아요.' },
  { id: 'l5', icon: 'phoneOff', tone: 'red', title: '운전 중 휴대폰 조작 금지', desc: '통화·문자와 화면 조작은 차를 세운 뒤에 해요. 내비 화면을 보는 건 괜찮지만 목적지 입력과 설정은 출발 전에 해요.' },
  { id: 'l6', icon: 'hipass', tone: 'mint', title: '하이패스 차로는 시속 30km', soz: true, desc: '일반 하이패스 차로는 시속 30km로 제한돼요. 다차로 하이패스 구간은 표지판 속도를 따르세요.' },
]
