// 카카오모빌리티 자동차 길찾기 호출
// 중요: 카카오 응답은 화면에 보여 주는 데만 쓰고 DB에 저장하거나 캐싱하지 않아요 (카카오 정책).
const config = require('../config');

const DIRECTIONS_URL = 'https://apis-navi.kakaomobility.com/v1/directions';

function httpError(status, code, message) {
  const err = new Error(message);
  err.status = status;
  err.code = code;
  err.expose = true;
  return err;
}

// 카카오 응답에서 앱에 필요한 값만 추려요.
function trimRoute(route) {
  const s = route.summary;
  const path = []; // [[경도, 위도], ...] 지도에 그릴 선
  const roads = [];
  const guides = [];

  for (const section of route.sections || []) {
    for (const road of section.roads || []) {
      const v = road.vertexes || [];
      const prev = path[path.length - 1];
      const from = prev && prev[0] === v[0] && prev[1] === v[1] ? path.length - 1 : path.length;
      for (let i = 0; i + 1 < v.length; i += 2) {
        const last = path[path.length - 1];
        if (!last || last[0] !== v[i] || last[1] !== v[i + 1]) path.push([v[i], v[i + 1]]);
      }
      roads.push({
        name: road.name,
        distance: road.distance,
        duration: road.duration,
        trafficState: road.traffic_state, // 0 정보없음, 1 정체, 2 지체, 3 서행, 4 원활, 6 사고 통제
        trafficSpeed: road.traffic_speed,
        from, // path에서 이 도로가 시작하는 위치
        to: path.length - 1,
      });
    }
    for (const g of section.guides || []) {
      guides.push({
        x: g.x,
        y: g.y,
        type: g.type, // 1 좌회전, 2 우회전, 300 톨게이트, 301 휴게소 ...
        name: g.name,
        guidance: g.guidance,
        distance: g.distance, // 이전 안내 지점부터 거리(m)
        duration: g.duration,
      });
    }
  }

  return {
    priority: s.priority,
    distance: s.distance, // m
    duration: s.duration, // 초
    toll: (s.fare && s.fare.toll) || 0, // 통행료(원)
    bound: s.bound,
    path,
    roads,
    guides,
  };
}

async function getDirections({
  origin,
  destination,
  waypoints = [],
  priority = 'RECOMMEND',
  avoid = [],
  carFuel = 'GASOLINE',
  carHipass = false,
  carType = 1,
  alternatives = false,
}) {
  const params = new URLSearchParams({
    origin: `${origin.x},${origin.y}`,
    destination: `${destination.x},${destination.y}`,
    priority,
    car_fuel: carFuel === 'HYBRID' ? 'GASOLINE' : carFuel,
    car_hipass: String(carHipass),
    car_type: String(carType),
    alternatives: String(alternatives),
    road_details: 'false',
    summary: 'false',
  });
  if (waypoints.length) params.set('waypoints', waypoints.map((w) => `${w.x},${w.y}`).join('|'));
  if (avoid.length) params.set('avoid', avoid.join('|'));

  let res;
  try {
    res = await fetch(`${DIRECTIONS_URL}?${params}`, {
      headers: { Authorization: `KakaoAK ${config.kakaoKey}` },
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    if (err.name === 'TimeoutError') throw httpError(504, 'KAKAO_TIMEOUT', '카카오 길찾기 응답이 8초 넘게 없어요.');
    throw httpError(502, 'KAKAO_UNREACHABLE', '카카오 서버에 연결하지 못했어요.');
  }

  const body = await res.json().catch(() => ({}));

  if (res.status === 401) throw httpError(502, 'KAKAO_AUTH', '카카오 REST API 키가 틀렸어요. server/.env를 확인해 주세요.');
  if (res.status === 429) throw httpError(503, 'KAKAO_QUOTA', '카카오 호출 한도를 넘었어요.');
  if (!res.ok) {
    throw httpError(502, 'KAKAO_ERROR', `카카오 오류 (HTTP ${res.status}) ${body.msg || body.message || ''}`.trim());
  }

  const ok = (body.routes || []).filter((r) => r.result_code === 0);
  if (!ok.length) {
    const first = (body.routes || [])[0] || {};
    // 예: 출발지와 도착지가 너무 가까움, 근처에 도로가 없음
    throw httpError(422, 'NO_ROUTE', first.result_msg || '경로를 찾지 못했어요.');
  }
  return ok.map(trimRoute);
}

module.exports = { getDirections, trimRoute };
