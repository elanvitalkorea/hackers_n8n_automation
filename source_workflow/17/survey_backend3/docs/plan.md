
### 3\. 백엔드 구현 소스 (Full Code)

13차시 실습용 폴더를 만들고, 아래 3개 파일을 생성합니다.

#### `package.json`

```json
{
  "name": "n8n-pdf-generator",
  "version": "1.0.0",
  "description": "Generates PDF reports for n8n workflows",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.577.0",
    "fastify": "^4.27.0",
    "puppeteer": "^22.10.0"
  }
}
```

#### `Dockerfile` (핵심\!)

```dockerfile
# 1. Base Image: Node.js 18 (Slim)
FROM node:18-slim

# 2. Install Puppeteer Dependencies
#    Puppeteer(Chromium)가 헤드리스 모드로 실행되기 위해 필요한 리눅스 라이브러리들
RUN apt-get update \
    && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils \
    --no-install-recommends \
    # Clean up
    && apt-get purge -y .* \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 3. Create app directory
WORKDIR /usr/src/app

# 4. Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# 5. Copy app source code
COPY . .

# 6. Expose port and start app
ENV PORT=8080
EXPOSE 8080
CMD [ "npm", "start" ]
```

#### `server.js` (S3 업로드 로직 수정됨)

n8n에 공개 URL 대신 S3 파일 키(Key)를 반환하도록 수정합니다.

```javascript
import Fastify from 'fastify';
import puppeteer from 'puppeteer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

// --- S3 클라이언트 설정 ---
// Render/Cloud Run의 환경 변수에서 키를 읽어옵니다.
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-northeast-2', // 서울 리전
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  }
});
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

// -------------------------

const fastify = Fastify({ logger: true });

// n8n에서 받은 JSON 데이터로 HTML을 동적 생성하는 함수
const getHtmlContent = (data) => {
  const items = data.items.map(item =>
    `<li>${item.name}: ${item.value}</li>`
  ).join('');

  return `
    <html>
      <head><style>body { font-family: sans-serif; } h1 { color: #333; }</style></head>
      <body>
        <h1>${data.title || 'My Report'}</h1>
        <p>This report was generated on ${new Date().toLocaleDateString()}</p>
        <ul>${items}</ul>
      </body>
    </html>
  `;
};

// POST /generate 엔드포인트
fastify.post('/generate', async (request, reply) => {
  if (!S3_BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_KEY) {
    return reply.code(500).send({ error: 'S3 environment variables are not set' });
  }

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Docker 환경 필수 옵션
    });
    const page = await browser.newPage();

    // 1. n8n에서 받은 JSON 본문(body)으로 HTML 생성
    const html = getHtmlContent(request.body);
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // 2. HTML을 PDF 버퍼로 생성
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    // 3. S3 업로드 로직
    const fileName = `reports/report-${randomUUID()}.pdf`;

    const uploadCommand = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
      // ACL: 'public-read' // <-- 버킷이 비공개이므로 이 옵션은 필요 없습니다.
    });

    await s3Client.send(uploadCommand);

    // 4. [수정됨] S3 URL을 직접 생성하지 않습니다.
    // const fileUrl = `https://${S3_BUCKET_NAME}.s3...` // <-- 이 코드를 삭제

    // 5. [수정됨] n8n에 S3 파일 키(Key)와 버킷 정보를 반환합니다.
    reply
      .code(200)
      .send({
        success: true,
        message: 'PDF generated and uploaded to S3',
        // n8n의 S3 노드가 이 정보를 사용합니다.
        bucket: S3_BUCKET_NAME,
        key: fileName
      });

  } catch (error) {
    fastify.log.error(error);
    reply.code(500).send({ error: 'Failed to generate PDF', details: error.message });
  }
});

// 서버 실행
const start = async () => {
  try {
    // Cloud Run, Render는 PORT 환경변수로 포트를 주입합니다.
    const port = process.env.PORT || 3000;
    await fastify.listen({ port: port, host: '0.0.0.0' });
    fastify.log.info(`Server listening on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
```
