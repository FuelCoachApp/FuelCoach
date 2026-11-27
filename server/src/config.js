// server/.env 값을 읽어서 다른 파일에서 쓰기 좋게 모아 두는 곳
// Node 20.12 이상에 들어 있는 process.loadEnvFile을 써서 별도 패키지가 필요 없어요.
const path = require('node:path');

try {
  process.loadEnvFile(path.join(__dirname, '..', '.env'));
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('[설정] server/.env 파일이 없어요. .env.example을 복사해서 .env로 만들고 값을 채워 주세요.');
    process.exit(1);
  }
  throw err;
}

function need(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`[설정] server/.env에 ${name} 값이 비어 있어요.`);
    process.exit(1);
  }
  return value;
}

module.exports = {
  port: Number(process.env.PORT) || 4000,
  mongoUri: need('MONGODB_URI'),
  kakaoKey: need('KAKAO_REST_API_KEY'),
};
