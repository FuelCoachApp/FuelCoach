// 서버와 DB가 살아 있는지 확인하는 주소: GET /api/health
const router = require('express').Router();
const mongoose = require('mongoose');

const DB_STATES = ['disconnected', 'connected', 'connecting', 'disconnecting'];

router.get('/', (req, res) => {
  res.json({
    ok: true,
    db: DB_STATES[mongoose.connection.readyState] || 'unknown',
    time: new Date().toISOString(),
  });
});

module.exports = router;
