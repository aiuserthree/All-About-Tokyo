#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🗺️  Google Maps API 키 설정 도구');
console.log('=====================================\n');

console.log('📋 설정 전 준비사항:');
console.log('1. Google Cloud Console에서 프로젝트 생성');
console.log('2. Maps JavaScript API 활성화');
console.log('3. API 키 발급');
console.log('4. 자세한 가이드: docs/api-key-setup-guide.md\n');

rl.question('Google Maps API 키를 입력하세요: ', (apiKey) => {
  if (!apiKey || apiKey.trim() === '') {
    console.log('❌ API 키가 입력되지 않았습니다.');
    rl.close();
    return;
  }

  // .env.local 파일 생성
  const envContent = `# Google Maps API Key
# 자세한 설정 방법: docs/api-key-setup-guide.md
VITE_GOOGLE_MAPS_API_KEY=${apiKey.trim()}
`;

  const envPath = path.join(process.cwd(), '.env.local');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local 파일이 생성되었습니다.');
    console.log('📍 파일 위치:', envPath);
    console.log('\n🚀 다음 단계:');
    console.log('1. 개발 서버 재시작: pnpm run dev');
    console.log('2. 브라우저에서 지도 기능 테스트');
    console.log('3. "먹기" 탭에서 "지도에서 보기" 버튼 클릭');
  } catch (error) {
    console.error('❌ 파일 생성 실패:', error.message);
  }

  rl.close();
});
