// 경로 위에 있는 코칭 지점 찾기
// 1) 경로를 감싸는 사각형 안의 지점을 DB에서 가져오고
// 2) 그중 경로선에서 30m 안에 있는 것만 남겨서
// 3) 출발지에서 가까운 순서로 정렬해요.
const mongoose = require('mongoose');
const { lineString, point } = require('@turf/helpers');
const { nearestPointOnLine } = require('@turf/nearest-point-on-line');
const CoachingPoint = require('../models/CoachingPoint');

const MAX_OFFSET_M = 30;
const BOX_PAD_DEG = 0.0005; // 약 50m

function boundingBox(path) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of path) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  minX -= BOX_PAD_DEG;
  minY -= BOX_PAD_DEG;
  maxX += BOX_PAD_DEG;
  maxY += BOX_PAD_DEG;
  return {
    type: 'Polygon',
    coordinates: [[[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY], [minX, minY]]],
  };
}

async function findCoachingPoints(path, { maxOffsetM = MAX_OFFSET_M } = {}) {
  // DB가 안 붙어 있으면 코칭 지점 없이 길찾기만 돌려줘요.
  if (mongoose.connection.readyState !== 1 || !path || path.length < 2) return [];

  const candidates = await CoachingPoint.find({
    location: { $geoWithin: { $geometry: boundingBox(path) } },
  }).lean();

  const line = lineString(path);
  const found = [];
  for (const c of candidates) {
    const [x, y] = c.location.coordinates;
    const near = nearestPointOnLine(line, point([x, y]), { units: 'meters' });
    const offsetM = near.properties.pointDistance;
    if (offsetM <= maxOffsetM) {
      found.push({
        id: c._id,
        type: c.type,
        x,
        y,
        alongM: Math.round(near.properties.totalDistance), // 출발지에서 경로를 따라간 거리
        offsetM: Math.round(offsetM * 10) / 10, // 경로선에서 떨어진 거리
        attrs: c.attrs,
      });
    }
  }
  return found.sort((a, b) => a.alongM - b.alongM);
}

module.exports = { findCoachingPoints, boundingBox };
