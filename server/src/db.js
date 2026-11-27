// MongoDB Atlas 연결
const mongoose = require('mongoose');

// 자주 나는 연결 오류를 알아보기 쉬운 말로 바꿔 줘요.
function explain(err) {
  const msg = String((err && err.message) || err);
  if (/bad auth|authentication failed/i.test(msg)) {
    return '아이디나 비밀번호가 틀렸어요. Atlas > Database Access에서 확인해 주세요. (비밀번호에 @ : / 같은 특수문자가 있으면 URL 인코딩이 필요해요)';
  }
  if (/ENOTFOUND|querySrv/i.test(msg)) {
    return '클러스터 주소를 찾지 못했어요. MONGODB_URI에서 @ 뒤의 주소가 맞는지 확인해 주세요.';
  }
  if (/ECONNREFUSED/i.test(msg)) {
    return 'DB 서버가 연결을 거부했어요. MONGODB_URI가 Atlas 주소(mongodb+srv://...)인지 확인해 주세요.';
  }
  if (/whitelist|not authorized to access|Server selection timed out|ReplicaSetNoPrimary/i.test(msg)) {
    return '접속이 막혔어요. Atlas > Network Access에 지금 내 IP가 등록돼 있는지 확인해 주세요.';
  }
  return msg;
}

async function connectDB(uri) {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    const { host, name } = mongoose.connection;
    console.log(`[DB] MongoDB 연결 성공: ${host} (DB 이름: ${name})`);
    return true;
  } catch (err) {
    console.error(`[DB] MongoDB 연결 실패: ${explain(err)}`);
    console.error('[DB] DB 없이 서버만 켜요. 길찾기는 되지만 코칭 지점 검색은 빈 값으로 나와요.');
    return false;
  }
}

module.exports = { connectDB };
