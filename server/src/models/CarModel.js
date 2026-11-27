// car_models: 에너지공단 공인연비 (마스터 데이터)
const { Schema, model } = require('mongoose');
const { FUELS } = require('./common');

const carModelSchema = new Schema(
  {
    maker: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: Number,
    fuel: { type: String, enum: FUELS },
    displacementCc: Number,
    transmission: String,
    combinedKmL: { type: Number, required: true }, // 복합 연비
    cityKmL: Number,
    highwayKmL: Number,
    grade: { type: Number, min: 1, max: 5 }, // 연비 등급
  },
  { timestamps: true, collection: 'car_models' },
);

carModelSchema.index({ maker: 1, model: 1, year: -1 });

module.exports = model('CarModel', carModelSchema);
