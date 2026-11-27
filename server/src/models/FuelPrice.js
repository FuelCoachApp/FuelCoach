// fuel_prices: 오피넷 평균 유가 (하루 한 번 저장)
const { Schema, model } = require('mongoose');

const fuelPriceSchema = new Schema(
  {
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ }, // "2026-11-27"
    area: { type: String, default: '전국' },
    fuel: { type: String, enum: ['GASOLINE', 'DIESEL', 'LPG'], required: true },
    avgWon: { type: Number, required: true },
  },
  { timestamps: true, collection: 'fuel_prices' },
);

fuelPriceSchema.index({ date: 1, area: 1, fuel: 1 }, { unique: true });

module.exports = model('FuelPrice', fuelPriceSchema);
