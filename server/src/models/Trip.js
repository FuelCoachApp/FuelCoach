// trips: 주행 기록
// 거리·시간은 카카오 예상값이 아니라 앱이 GPS로 직접 잰 값을 저장해요.
// GPS 전체 궤적은 저장하지 않고 요약값만 남겨요.
const { Schema, model } = require('mongoose');
const { COACH_TYPES, PRIORITIES, AVOIDS } = require('./common');

const coachingEventSchema = new Schema(
  {
    pointId: { type: Schema.Types.ObjectId, ref: 'CoachingPoint' },
    type: { type: String, enum: COACH_TYPES, required: true },
    at: { type: Date, required: true },
    alertKmh: Number, // 안내할 때 속도
    passKmh: Number, // 지점을 지날 때 속도
    limitKmh: Number, // 제한속도
    followed: Boolean, // 코칭대로 감속했는지
  },
  { _id: false },
);

const tripSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    startedAt: { type: Date, required: true },
    endedAt: Date,
    month: { type: String, match: /^\d{4}-\d{2}$/ }, // "2026-11" 월별·달력 집계용 (한국 시간 기준)
    originLabel: String,
    destLabel: String,
    options: {
      priority: { type: String, enum: PRIORITIES },
      avoid: [{ type: String, enum: AVOIDS }],
    },
    measured: {
      distanceM: { type: Number, min: 0 },
      durationS: { type: Number, min: 0 },
      avgKmh: Number,
      maxKmh: Number,
      idleS: Number,
      hardAccel: Number,
      hardBrake: Number,
    },
    fuel: {
      baselineL: Number, // 코칭 없이 달렸다고 가정한 연료량
      estimatedL: Number, // 실제 운전으로 추정한 연료량
      savedL: Number,
      pricePerL: Number, // 그날 유가 (fuel_prices)
      savedWon: Number,
    },
    coachingEvents: [coachingEventSchema],
    ecoScore: { type: Number, min: 0, max: 100 },
  },
  { timestamps: true, collection: 'trips' },
);

// month를 비워 두면 startedAt으로 자동 계산 (UTC가 아니라 한국 시간 기준)
tripSchema.pre('validate', function setMonth() {
  if (!this.month && this.startedAt) {
    const kst = new Date(this.startedAt.getTime() + 9 * 60 * 60 * 1000);
    this.month = kst.toISOString().slice(0, 7);
  }
});

tripSchema.index({ userId: 1, startedAt: -1 });
tripSchema.index({ userId: 1, month: 1 });

module.exports = model('Trip', tripSchema);
