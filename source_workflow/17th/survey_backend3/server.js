import Fastify from 'fastify';
import cors from '@fastify/cors';
import puppeteer from 'puppeteer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

// ===================================
// 환경 변수 검증
// ===================================
const requiredEnvVars = ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_KEY', 'S3_BUCKET_NAME'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// ===================================
// S3 클라이언트 설정
// ===================================
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  // 타임아웃 및 재시도 설정
  maxAttempts: 3,
  requestHandler: {
    requestTimeout: 30000, // 30초
  }
});

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const PORT = parseInt(process.env.PORT || '8080', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';

// ===================================
// Fastify 인스턴스 생성
// ===================================
const fastify = Fastify({
  logger: {
    level: NODE_ENV === 'production' ? 'info' : 'debug',
    transport: NODE_ENV === 'development' ? {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      }
    } : undefined,
  },
  requestTimeout: 60000, // 60초
  bodyLimit: 1048576, // 1MB
});

// CORS 설정
await fastify.register(cors, {
  origin: true, // 프로덕션에서는 특정 origin만 허용하도록 변경
});

// ===================================
// Puppeteer 브라우저 인스턴스 관리
// ===================================
let browserInstance = null;

const getBrowser = async () => {
  if (!browserInstance || !browserInstance.connected) {
    fastify.log.info('🚀 Launching new browser instance...');
    browserInstance = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // Docker 환경에서 메모리 이슈 방지
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--disable-web-security', // 외부 리소스 로드 시
        '--single-process', // 메모리 절약
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    });
  }
  return browserInstance;
};

// Graceful shutdown
const closeBrowser = async () => {
  if (browserInstance) {
    fastify.log.info('🔒 Closing browser instance...');
    await browserInstance.close();
    browserInstance = null;
  }
};

// ===================================
// 유틸리티 함수
// ===================================

/**
 * 요청 데이터 검증
 */
const validateRequestData = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Request body must be a valid JSON object');
  }

  if (!Array.isArray(data.items)) {
    throw new Error('Request body must contain an "items" array');
  }

  return true;
};

/**
 * HTML 콘텐츠 생성
 */
const generateHtmlContent = (data) => {
  const items = data.items
    .map(item => {
      const name = String(item.name || '').replace(/[<>]/g, '');
      const value = String(item.value || '').replace(/[<>]/g, '');
      return `<li><strong>${name}</strong>: ${value}</li>`;
    })
    .join('');

  const title = String(data.title || 'My Report').replace(/[<>]/g, '');
  const date = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          @page {
            margin: 20mm;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Noto Sans CJK KR', 'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', sans-serif;
            padding: 40px;
            background: #fff;
            color: #333;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 32px;
            font-weight: 700;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
          }
          .date {
            color: #7f8c8d;
            font-size: 14px;
            margin-bottom: 30px;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            padding: 12px 15px;
            margin-bottom: 8px;
            background: #f8f9fa;
            border-left: 4px solid rgb(17, 171, 74);
            border-radius: 4px;
          }
          li strong {
            color: #2c3e50;
            font-weight: 600;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ecf0f1;
            text-align: center;
            color: #95a5a6;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <p class="date">생성일: ${date}</p>
        <ul>${items}</ul>
        <div class="footer">
          <p>Generated by n8n PDF Generator</p>
        </div>
      </body>
    </html>
  `;
};

/**
 * S3에 PDF 업로드
 */
const uploadToS3 = async (pdfBuffer, fileName) => {
  const uploadCommand = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Body: pdfBuffer,
    ContentType: 'application/pdf',
    Metadata: {
      'generated-at': new Date().toISOString(),
      'generator': 'n8n-pdf-generator'
    }
  });

  await s3Client.send(uploadCommand);
  return fileName;
};

// ===================================
// 라우트
// ===================================

/**
 * Health Check
 */
fastify.get('/health', async (request, reply) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  };
});

/**
 * PDF 생성 및 S3 업로드
 */
fastify.post('/generate', async (request, reply) => {
  const startTime = Date.now();
  let page = null;

  try {
    // 1. 요청 데이터 검증
    validateRequestData(request.body);

    // 2. 브라우저 인스턴스 가져오기
    const browser = await getBrowser();
    page = await browser.newPage();

    // 타임아웃 설정
    page.setDefaultTimeout(30000);

    // 3. HTML 콘텐츠 생성 및 렌더링
    const html = generateHtmlContent(request.body);
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // 4. PDF 생성
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true,
      preferCSSPageSize: false,
    });

    // 5. 페이지 닫기 (메모리 해제)
    await page.close();
    page = null;

    // 6. S3 업로드
    const fileName = `reports/${new Date().toISOString().split('T')[0]}/report-${randomUUID()}.pdf`;
    await uploadToS3(pdfBuffer, fileName);

    const duration = Date.now() - startTime;
    fastify.log.info(`✅ PDF generated and uploaded in ${duration}ms`);

    // 7. 응답 반환
    return {
      success: true,
      message: 'PDF generated and uploaded to S3',
      bucket: S3_BUCKET_NAME,
      key: fileName,
      size: pdfBuffer.length,
      duration: `${duration}ms`,
    };

  } catch (error) {
    // 페이지가 열려있으면 닫기
    if (page) {
      try {
        await page.close();
      } catch (closeError) {
        fastify.log.error('Failed to close page:', closeError);
      }
    }

    fastify.log.error('❌ PDF generation failed:', error);

    // 에러 유형별 응답
    const statusCode = error.message.includes('validation') ? 400 : 500;
    const errorResponse = {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };

    // 개발 환경에서만 스택 트레이스 포함
    if (NODE_ENV === 'development') {
      errorResponse.stack = error.stack;
    }

    return reply.code(statusCode).send(errorResponse);
  }
});

/**
 * API 정보
 */
fastify.get('/', async () => {
  return {
    name: 'n8n PDF Generator API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      generate: 'POST /generate',
    },
    documentation: {
      generate: {
        method: 'POST',
        path: '/generate',
        body: {
          title: 'string (optional)',
          items: [
            { name: 'string', value: 'string' }
          ]
        },
        response: {
          success: 'boolean',
          bucket: 'string',
          key: 'string',
          size: 'number',
          duration: 'string'
        }
      }
    }
  };
});

// ===================================
// 서버 시작 및 Graceful Shutdown
// ===================================
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`🚀 Server listening on port ${PORT}`);
    fastify.log.info(`📝 Environment: ${NODE_ENV}`);
    fastify.log.info(`☁️  S3 Bucket: ${S3_BUCKET_NAME}`);
  } catch (err) {
    fastify.log.error(err);
    await closeBrowser();
    process.exit(1);
  }
};

// Graceful shutdown 핸들러
const gracefulShutdown = async (signal) => {
  fastify.log.info(`${signal} received, shutting down gracefully...`);
  try {
    await fastify.close();
    await closeBrowser();
    process.exit(0);
  } catch (err) {
    fastify.log.error('Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 서버 시작
start();

