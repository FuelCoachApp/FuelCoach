// places: 즐겨찾기 장소 (집, 회사 등)
// 카카오 장소 검색 결과의 좌표·주소를 그대로 저장하면 안 돼요 (카카오 정책).
// 좌표는 현재 위치(gps), 지도에서 찍은 핀(pin), 행안부 주소 데이터(juso)에서만 받아요.
const { Schema, model } = require('mongoose');
const { pointSchema } = require('./common');

const placeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    kind: { type: String, enum: ['HOME', 'WORK', 'CUSTOM'], default: 'CUSTOM' },
    label: { type: String, required: true, trim: true, maxlength: 20 }, // 사용자가 직접 입력한 이름
    addressText: { type: String, trim: true },
    location: { type: pointSchema, required: true },
    coordSource: { type: String, enum: ['gps', 'pin', 'juso'], required: true },
  },
  { timestamps: true, collection: 'places' },
);

module.exports = model('Place', placeSchema);
