// users: 회원
const { Schema, model } = require('mongoose');
const { COACH_TYPES } = require('./common');

const userSchema = new Schema(
  {
    loginId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 8,
      maxlength: 20,
      match: [/^[A-Za-z0-9_]+$/, '아이디는 영문, 숫자, _만 쓸 수 있어요.'],
    },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    emailVerified: { type: Boolean, default: false },
    // 비밀번호 원문은 절대 저장하지 않고 bcrypt 해시만 저장해요. 조회할 때 기본으로 빠져요.
    passwordHash: { type: String, required: true, select: false },
    nickname: { type: String, trim: true, maxlength: 20 },
    settings: {
      voiceOn: { type: Boolean, default: true },
      volume: { type: Number, min: 0, max: 100, default: 80 },
      coachTypes: { type: [{ type: String, enum: COACH_TYPES }], default: () => [...COACH_TYPES] },
    },
    agreements: {
      terms: { type: Boolean, default: false },
      location: { type: Boolean, default: false },
      marketing: { type: Boolean, default: false },
      agreedAt: Date,
    },
  },
  { timestamps: true, collection: 'users' },
);

module.exports = model('User', userSchema);
