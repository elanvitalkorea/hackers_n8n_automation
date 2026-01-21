# ===================================
# 멀티스테이지 빌드: 의존성 설치 단계
# ===================================
FROM node:20-slim AS dependencies

# Puppeteer가 Chromium을 다운로드하지 않도록 설정 (시스템 Chromium 사용)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /usr/src/app

# package.json 복사 (레이어 캐싱 최적화)
COPY package*.json ./

# 프로덕션 의존성만 설치
RUN npm install --omit=dev --ignore-scripts

# ===================================
# 최종 런타임 이미지
# ===================================
FROM node:20-slim

# Chromium 및 필수 의존성 설치
RUN apt-get update \
    && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    fonts-noto-color-emoji \
    fonts-noto-cjk \
    fonts-noto-cjk-extra \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# 비루트 사용자 생성 (보안)
RUN groupadd -r appuser && useradd -r -g appuser -G audio,video appuser \
    && mkdir -p /home/appuser/Downloads \
    && chown -R appuser:appuser /home/appuser

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 복사
COPY --from=dependencies --chown=appuser:appuser /usr/src/app/node_modules ./node_modules

# 애플리케이션 소스 복사
COPY --chown=appuser:appuser . .

# 시스템 Chromium 경로 설정
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV NODE_ENV=production
ENV PORT=8080

# 비루트 사용자로 전환
USER appuser

# 포트 노출
EXPOSE 8080

# 헬스체크 추가
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 애플리케이션 실행
CMD ["node", "server.js"]

