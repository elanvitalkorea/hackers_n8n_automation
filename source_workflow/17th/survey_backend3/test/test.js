import fetch from 'node-fetch';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = process.env.API_URL || 'http://localhost:8080';

// 색상 코드
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}${msg}${colors.reset}`),
  header: (msg) => {
    console.log(`\n${colors.cyan}${'='.repeat(50)}`);
    console.log(`  ${msg}`);
    console.log(`${'='.repeat(50)}${colors.reset}\n`);
  }
};

// 테스트 결과 추적
const results = {
  total: 0,
  passed: 0,
  failed: 0,
};

// 테스트 헬퍼
async function test(name, fn) {
  results.total++;
  try {
    await fn();
    results.passed++;
    log.success(name);
    return true;
  } catch (error) {
    results.failed++;
    log.error(`${name}: ${error.message}`);
    console.error(error);
    return false;
  }
}

// 1. Health Check 테스트
async function testHealthCheck() {
  log.header('1. Health Check 테스트');
  
  await test('서버 Health Check', async () => {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) throw new Error('Health check failed');
    
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    
    if (data.status !== 'ok') {
      throw new Error('Server status is not ok');
    }
  });
}

// 2. API 정보 테스트
async function testApiInfo() {
  log.header('2. API 정보 조회 테스트');
  
  await test('API 정보 조회', async () => {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) throw new Error('API info request failed');
    
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    
    if (!data.name || !data.endpoints) {
      throw new Error('Invalid API info response');
    }
  });
}

// 3. PDF 생성 테스트
async function testPdfGeneration() {
  log.header('3. PDF 생성 및 S3 업로드 테스트');
  
  // 테스트 데이터 로드
  const testDataPath = join(__dirname, 'test-data.json');
  const testData = JSON.parse(await fs.readFile(testDataPath, 'utf-8'));
  
  await test('PDF 생성 (test-data.json)', async () => {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });
    
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'PDF generation failed');
    }
    
    if (!data.bucket || !data.key) {
      throw new Error('Missing bucket or key in response');
    }
    
    log.info(`\n📁 Bucket: ${data.bucket}`);
    log.info(`🔑 Key: ${data.key}`);
    log.info(`📊 Size: ${(data.size / 1024).toFixed(2)} KB`);
    log.info(`⏱️  Duration: ${data.duration}\n`);
  });
}

// 4. 다양한 데이터 테스트
async function testVariousData() {
  log.header('4. 다양한 데이터 형식 테스트');
  
  // 간단한 데이터
  await test('간단한 데이터 (3개 항목)', async () => {
    const simpleData = {
      title: '간단한 테스트',
      items: [
        { name: '항목1', value: '값1' },
        { name: '항목2', value: '값2' },
        { name: '항목3', value: '값3' },
      ],
    };
    
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simpleData),
    });
    
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed');
    }
  });
  
  // 많은 데이터
  await test('많은 데이터 (20개 항목)', async () => {
    const largeData = {
      title: '대용량 데이터 테스트',
      items: Array.from({ length: 20 }, (_, i) => ({
        name: `항목 ${i + 1}`,
        value: `값 ${i + 1} - ${Math.random().toFixed(4)}`,
      })),
    };
    
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(largeData),
    });
    
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed');
    }
  });
  
  // 한글 데이터
  await test('한글 및 특수문자', async () => {
    const koreanData = {
      title: '한국어 리포트 📊',
      items: [
        { name: '테스트 항목', value: '가나다라마바사' },
        { name: '숫자 포함', value: '1,234,567원' },
        { name: '퍼센트', value: '99.9%' },
        { name: '이메일', value: 'test@example.com' },
      ],
    };
    
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(koreanData),
    });
    
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed');
    }
  });
}

// 5. 에러 핸들링 테스트
async function testErrorHandling() {
  log.header('5. 에러 핸들링 테스트');
  
  await test('잘못된 데이터 형식', async () => {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invalid: 'data' }),
    });
    
    const data = await response.json();
    
    // 에러가 제대로 반환되는지 확인
    if (response.ok) {
      throw new Error('Should have returned an error');
    }
    
    if (!data.error) {
      throw new Error('Error message missing');
    }
    
    log.info(`Expected error: ${data.error}`);
  });
  
  await test('빈 items 배열', async () => {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test', items: [] }),
    });
    
    const data = await response.json();
    
    // 빈 배열도 허용되어야 함
    if (data.success) {
      log.info('Empty items array handled gracefully');
    } else {
      log.info(`Rejected empty array: ${data.error}`);
    }
  });
}

// 메인 테스트 실행
async function runAllTests() {
  console.log('\n');
  log.header('🚀 n8n PDF Generator - 통합 테스트');
  
  console.log(`API URL: ${API_URL}\n`);
  
  try {
    await testHealthCheck();
    await testApiInfo();
    await testPdfGeneration();
    await testVariousData();
    await testErrorHandling();
    
    // 결과 요약
    log.header('테스트 결과 요약');
    console.log(`총 테스트: ${results.total}`);
    console.log(`${colors.green}통과: ${results.passed}${colors.reset}`);
    console.log(`${colors.red}실패: ${results.failed}${colors.reset}`);
    
    if (results.failed === 0) {
      log.success('\n🎉 모든 테스트가 통과했습니다!');
      process.exit(0);
    } else {
      log.error('\n❌ 일부 테스트가 실패했습니다.');
      process.exit(1);
    }
    
  } catch (error) {
    log.error(`테스트 실행 중 오류 발생: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// 실행
runAllTests();

