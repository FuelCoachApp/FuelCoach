// 길찾기: GET /api/directions?origin=경도,위도&destination=경도,위도
// 선택: waypoints=경도,위도|경도,위도  priority=RECOMMEND|TIME|DISTANCE
//       avoid=toll,schoolzone  fuel=GASOLINE  hipass=true  alternatives=true
const router = require('express').Router();
const { getDirections } = require('../services/kakao');
const { findCoachingPoints } = require('../services/coaching');
const { PRIORITIES, AVOIDS, FUELS } = require('../models/common');

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  err.code = 'BAD_REQUEST';
  err.expose = true;
  return err;
}

function parsePoint(text, label) {
  const [x, y] = String(text || '').split(',').map(Number);
  if (!Number.isFinite(x) || !Number.isFinite(y) || x < 124 || x > 132 || y < 33 || y > 39) {
    throw badRequest(`${label}는 "경도,위도" 순서로 보내 주세요. 예: 127.1464,36.8101`);
  }
  return { x, y };
}

function pick(value, allowed, fallback, label) {
  if (value === undefined || value === '') return fallback;
  if (!allowed.includes(value)) throw badRequest(`${label}는 ${allowed.join(', ')} 중 하나여야 해요.`);
  return value;
}

router.get('/', async (req, res) => {
  const q = req.query;

  const waypoints = q.waypoints ? String(q.waypoints).split('|').map((w) => parsePoint(w, 'waypoints')) : [];
  if (waypoints.length > 5) throw badRequest('경유지는 5개까지만 넣을 수 있어요.');

  const avoid = q.avoid ? String(q.avoid).split(',').map((s) => s.trim()).filter(Boolean) : [];
  for (const a of avoid) pick(a, AVOIDS, null, 'avoid');

  const routes = await getDirections({
    origin: parsePoint(q.origin, 'origin'),
    destination: parsePoint(q.destination, 'destination'),
    waypoints,
    priority: pick(q.priority, PRIORITIES, 'RECOMMEND', 'priority'),
    avoid,
    carFuel: pick(q.fuel, FUELS, 'GASOLINE', 'fuel'),
    carHipass: q.hipass === 'true',
    alternatives: q.alternatives === 'true',
  });

  for (const route of routes) {
    route.coachingPoints = await findCoachingPoints(route.path);
  }

  // 카카오 응답은 여기서 앱으로 보내고 끝. DB에 저장하지 않아요.
  res.json({ routes });
});

module.exports = router;
