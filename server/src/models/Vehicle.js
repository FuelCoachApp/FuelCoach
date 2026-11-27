// vehicles: 차량 (한 사람이 여러 대 등록 가능)
const { Schema, model } = require('mongoose');
const { FUELS } = require('./common');

const vehicleSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    nickname: { type: String, trim: true, maxlength: 20 },
    carModelId: { type: Schema.Types.ObjectId, ref: 'CarModel' },
    fuel: { type: String, enum: FUELS, required: true },
    // 등록할 때 car_models의 공인연비를 복사해 둬요. 마스터가 바뀌어도 지난 기록 계산이 안 바뀌게.
    officialKmL: { type: Number, min: 0 },
    kakaoCarType: { type: Number, min: 1, max: 7, default: 1 }, // 카카오 car_type (1 승용차)
    hipass: { type: Boolean, default: false },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'vehicles' },
);

module.exports = model('Vehicle', vehicleSchema);
