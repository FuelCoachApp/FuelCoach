// saved_routes: 경로 즐겨찾기
// 경로 좌표(카카오 응답)는 저장하지 않아요. 출발·도착·옵션만 저장하고, 열 때마다 길찾기를 다시 불러요.
const { Schema, model } = require('mongoose');
const { PRIORITIES, AVOIDS } = require('./common');

const savedRouteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true, maxlength: 30 },
    originPlaceId: { type: Schema.Types.ObjectId, ref: 'Place', default: null }, // null이면 현재 위치에서 출발
    destPlaceId: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    waypointPlaceIds: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    options: {
      priority: { type: String, enum: PRIORITIES, default: 'RECOMMEND' },
      avoid: [{ type: String, enum: AVOIDS }],
      hipass: { type: Boolean, default: false },
    },
    useCount: { type: Number, default: 0 },
    lastUsedAt: Date,
  },
  { timestamps: true, collection: 'saved_routes' },
);

savedRouteSchema.index({ userId: 1, lastUsedAt: -1 });

module.exports = model('SavedRoute', savedRouteSchema);
