const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envFilePath = path.join(__dirname, '.env.local');

console.log('\n🤖 OpenAI API 키 설정 도구');
console.log('=====================================\n');
console.log('📋 설정 전 준비사항:');
console.log('1. OpenAI 계정 생성: https://platform.openai.com/');
console.log('2. API 키 발급: https://platform.openai.com/api-keys');
console.log('3. 결제 정보 등록 (월 $5-20 예상)');
console.log('4. 자세한 가이드: docs/openai-setup-guide.md\n');

rl.question('OpenAI API 키를 입력하세요: ', (apiKey) => {
  if (!apiKey || apiKey.trim() === '') {
    console.error('❌ API 키가 입력되지 않았습니다. 설정을 취소합니다.');
    rl.close();
    return;
  }

  // 기존 .env.local 파일 읽기
  let envContent = '';
  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, 'utf8');
  }

  // OpenAI API 키 추가/업데이트
  const lines = envContent.split('\n');
  const openaiKeyLine = lines.findIndex(line => line.startsWith('VITE_OPENAI_API_KEY='));
  
  if (openaiKeyLine !== -1) {
    lines[openaiKeyLine] = `VITE_OPENAI_API_KEY=${apiKey.trim()}`;
  } else {
    lines.push(`VITE_OPENAI_API_KEY=${apiKey.trim()}`);
  }

  const newEnvContent = lines.join('\n') + '\n';

  fs.writeFile(envFilePath, newEnvContent, (err) => {
    if (err) {
      console.error('❌ .env.local 파일 생성 중 오류 발생:', err);
    } else {
      console.log('✅ .env.local 파일이 생성/업데이트되었습니다.');
      console.log(`📍 파일 위치: ${envFilePath}\n`);
      console.log('🚀 다음 단계:');
      console.log('1. 개발 서버 재시작: pnpm run dev');
      console.log('2. 브라우저에서 AI 챗봇 테스트');
      console.log('3. "AI 가이드" 탭에서 질문하기');
      console.log('\n💰 비용 안내:');
      console.log('- GPT-3.5-turbo: $0.002/1K 토큰');
      console.log('- 월 $5-20 정도 예상 (사용량에 따라)');
      console.log('- 무료 크레딧: $5 (신규 계정)');
    }
    rl.close();
  });
});
