// coaching_points: 코칭 지점 (단속카메라, 방지턱, 졸음쉼터, 급커브, 신호등, 스쿨존)
// data 폴더의 Python 스크립트가 공공데이터를 넣어요. 서버는 읽기만 해요.
const { Schema, model } = require('mongoose');
const { COACH_TYPES, pointSchema } = require('./common');

const coachingPointSchema = new Schema(
  {
    type: { type: String, enum: COACH_TYPES, required: true, index: true },
    location: { type: pointSchema, required: true },
    attrs: { type: Schema.Types.Mixed, default: {} }, // 종류마다 다름: 제한속도, 방향 등
    source: {
      dataset: String, // 공공데이터포털 번호 (예: 15028200)
      sourceId: String, // 원본 데이터의 관리번호
      fetchedAt: Date,
    },
  },
  { timestamps: true, collection: 'coaching_points' },
);

coachingPointSchema.index({ location: '2dsphere' });

module.exports = model('CoachingPoint', coachingPointSchema);
