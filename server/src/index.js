// 서버 시작점: npm run dev 하면 이 파일이 실행돼요.
const config = require('./config');
const { connectDB } = require('./db');
const { createApp } = require('./app');
require('./models'); // 모델 등록 (DB에 연결되면 인덱스도 자동으로 만들어져요)

async function main() {
  await connectDB(config.mongoUri);
  createApp().listen(config.port, () => {
    console.log(`[서버] 실행 중: http://localhost:${config.port}/api/health`);
  });
}

main();
