// 여러 모델에서 같이 쓰는 값과 스키마
const { Schema } = require('mongoose');

// 코칭 지점 종류
const COACH_TYPES = ['CAMERA', 'BUMP', 'DROWSY_REST', 'CURVE', 'SIGNAL', 'SCHOOL_ZONE'];

// 차량 연료 (HYBRID는 카카오 길찾기에 GASOLINE으로 보내요)
const FUELS = ['GASOLINE', 'DIESEL', 'LPG', 'HYBRID'];

// 카카오 길찾기 옵션
const PRIORITIES = ['RECOMMEND', 'TIME', 'DISTANCE'];
const AVOIDS = ['ferries', 'toll', 'motorway', 'schoolzone', 'uturn'];

// GeoJSON 점: coordinates는 [경도, 위도] 순서예요. (위도·경도 순서 아님!)
const pointSchema = new Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point', required: true },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (v) => v.length === 2 && v[0] >= 124 && v[0] <= 132 && v[1] >= 33 && v[1] <= 39,
        message: '좌표는 [경도, 위도] 순서의 국내 좌표여야 해요.',
      },
    },
  },
  { _id: false },
);

module.exports = { COACH_TYPES, FUELS, PRIORITIES, AVOIDS, pointSchema };
