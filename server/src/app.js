// Express 앱 설정: 미들웨어와 라우트를 연결해요.
const express = require('express');
const cors = require('cors');

const healthRouter = require('./routes/health');
const directionsRouter = require('./routes/directions');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/health', healthRouter);
  app.use('/api/directions', directionsRouter);

  // 없는 주소
  app.use((req, res) => {
    res.status(404).json({ error: 'NOT_FOUND', message: '없는 주소예요.' });
  });

  // 오류 처리 (Express 5는 async 함수에서 난 오류도 여기로 모아 줘요)
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    if (err.expose) console.warn(`[오류] ${err.code}: ${err.message}`);
    else console.error(err);
    res.status(status).json({
      error: err.code || 'SERVER_ERROR',
      message: err.expose ? err.message : '서버 오류가 났어요.',
    });
  });

  return app;
}

module.exports = { createApp };
