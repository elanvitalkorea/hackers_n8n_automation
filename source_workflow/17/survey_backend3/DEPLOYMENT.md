# GCP Cloud Run 배포 가이드

이 가이드는 Google Cloud Run에 n8n PDF Generator를 배포하고, GitHub과 Cloud Build를 연동하여 자동 배포(CI/CD)를 설정하는 방법을 설명합니다.

## 📋 목차

1. [사전 준비](#사전-준비)
2. [GCP 프로젝트 설정](#gcp-프로젝트-설정)
3. [Secret Manager 설정](#secret-manager-설정)
4. [수동 배포](#수동-배포)
5. [GitHub 자동 배포 설정](#github-자동-배포-설정)
6. [배포 확인 및 테스트](#배포-확인-및-테스트)
7. [트러블슈팅](#트러블슈팅)

---

## 🎯 사전 준비

### 필요한 도구

- Google Cloud SDK (gcloud CLI)
- GitHub 계정
- AWS S3 버킷 및 자격증명
- Docker (로컬 테스트용)

### gcloud CLI 설치

**macOS:**
```bash
brew install google-cloud-sdk
```

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

**Windows:**
[Google Cloud SDK 설치 프로그램](https://cloud.google.com/sdk/docs/install) 다운로드

### gcloud 초기화

```bash
# gcloud 초기화
gcloud init

# 로그인
gcloud auth login

# 프로젝트 설정
gcloud config set project YOUR_PROJECT_ID
```

---

## 🔧 GCP 프로젝트 설정

### 1. 새 프로젝트 생성 (선택사항)

```bash
# 프로젝트 생성
gcloud projects create n8n-pdf-generator --name="n8n PDF Generator"

# 프로젝트 설정
gcloud config set project n8n-pdf-generator
```

### 2. 필요한 API 활성화

```bash
# Cloud Run API 활성화
gcloud services enable run.googleapis.com

# Cloud Build API 활성화
gcloud services enable cloudbuild.googleapis.com

# Container Registry API 활성화
gcloud services enable containerregistry.googleapis.com

# Secret Manager API 활성화
gcloud services enable secretmanager.googleapis.com

# Artifact Registry API 활성화
gcloud services enable artifactregistry.googleapis.com
```

### 3. 프로젝트 ID 확인

```bash
# 현재 프로젝트 ID 확인
gcloud config get-value project

# 또는
export PROJECT_ID=$(gcloud config get-value project)
echo $PROJECT_ID
```

---

## 🔐 Secret Manager 설정

AWS 자격증명을 Secret Manager에 안전하게 저장합니다.

### 1. 시크릿 생성

```bash

# AWS_ACCESS_KEY_ID 저장
echo -n "YOUR_AWS_ACCESS_KEY_ID" | gcloud secrets create PDF_AWS_ACCESS_KEY_ID --data-file=-

# AWS_SECRET_KEY 저장
echo -n "YOUR_AWS_SECRET_KEY" | gcloud secrets create PDF_AWS_SECRET_KEY --data-file=-

# S3_BUCKET_NAME 저장
echo -n "YOUR_BUCKET_NAME" | gcloud secrets create PDF_S3_BUCKET_NAME --data-file=-
```

### 2. Cloud Run 서비스 계정에 권한 부여

```bash
# 기본 Compute Engine 서비스 계정 확인
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
export SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

# Secret Manager 접근 권한 부여
gcloud secrets add-iam-policy-binding AWS_ACCESS_KEY_ID \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding AWS_SECRET_KEY \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding S3_BUCKET_NAME \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor"
```

### 3. Cloud Build 서비스 계정에 권한 부여

```bash
# Cloud Build 서비스 계정에 Cloud Run Admin 권한 부여
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin"

# Cloud Build 서비스 계정에 Service Account User 권한 부여
gcloud iam service-accounts add-iam-policy-binding \
  ${SERVICE_ACCOUNT} \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

---

## 🚀 수동 배포

GitHub 연동 전에 수동으로 배포하여 테스트합니다.

### 1. Docker 이미지 빌드

```bash
# 프로젝트 루트 디렉토리에서
docker build -t gcr.io/$PROJECT_ID/n8n-pdf-generator:v1 .
```

### 2. Container Registry에 푸시

```bash
# Docker 인증 설정
gcloud auth configure-docker

# 이미지 푸시
docker push gcr.io/$PROJECT_ID/n8n-pdf-generator:v1
```

### 3. Cloud Run에 배포

```bash
gcloud beta run deploy n8n-pdf-generator \
  --image gcr.io/$PROJECT_ID/n8n-pdf-generator:v1 \
  --region asia-northeast3 \
  --platform managed \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 60s \
  --set-env-vars NODE_ENV=production,TZ=Asia/Seoul,AWS_REGION=ap-northeast-2 \
  --set-secrets AWS_ACCESS_KEY_ID=PDF_AWS_ACCESS_KEY_ID:latest,AWS_SECRET_KEY=PDF_AWS_SECRET_KEY:latest,S3_BUCKET_NAME=PDF_S3_BUCKET_NAME:latest
```

### 4. 배포 확인

```bash
# 서비스 URL 확인
gcloud run services describe n8n-pdf-generator \
  --region asia-northeast3 \
  --format 'value(status.url)'

# 또는
export SERVICE_URL=$(gcloud run services describe n8n-pdf-generator --region asia-northeast3 --format 'value(status.url)')
echo $SERVICE_URL

# Health Check
curl $SERVICE_URL/health
```

---

## 🤖 GitHub 자동 배포 설정

### 1. GitHub 저장소에 코드 푸시

```bash
# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/survey_backend.git
git branch -M main
git push -u origin main
```

### 2. Cloud Build Trigger 생성 (웹 콘솔)

#### 방법 A: GCP 콘솔에서 설정

1. [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers) 페이지 이동
2. **트리거 만들기** 클릭
3. 다음 설정 입력:

**이름:**
```
github-auto-deploy
```

**이벤트:**
- ☑️ 저장소에 푸시

**소스:**
- 저장소 연결: GitHub (처음이면 GitHub 계정 연결 필요)
- 저장소 선택: `YOUR_USERNAME/survey_backend`
- 브랜치: `^main$`

**구성:**
- 유형: Cloud Build 구성 파일 (yaml 또는 json)
- 위치: 저장소
- Cloud Build 구성 파일 위치: `/cloudbuild.yaml`

4. **만들기** 클릭

#### 방법 B: gcloud CLI로 설정

```bash
# GitHub 저장소 연결 (처음 한 번만)
gcloud beta builds triggers create github \
  --name="github-auto-deploy" \
  --repo-name="survey_backend" \
  --repo-owner="YOUR_USERNAME" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.yaml"
```

### 3. GitHub 저장소 연결

처음 연동 시 GitHub 권한 요청이 나타납니다:

1. GitHub 계정으로 로그인
2. Google Cloud Build 앱 설치 승인
3. 저장소 접근 권한 부여

### 4. 트리거 테스트

```bash
# 코드 수정 후 푸시
git add .
git commit -m "Test auto deployment"
git push origin main

# 빌드 로그 확인
gcloud builds list --limit=5
gcloud builds log [BUILD_ID]
```

---

## ✅ 배포 확인 및 테스트

### 1. Cloud Run 서비스 확인

```bash
# 서비스 상태 확인
gcloud run services describe n8n-pdf-generator --region asia-northeast3

# 서비스 URL 가져오기
export SERVICE_URL=$(gcloud run services describe n8n-pdf-generator --region asia-northeast3 --format 'value(status.url)')
echo "Service URL: $SERVICE_URL"
```

### 2. API 테스트

```bash
# Health Check
curl $SERVICE_URL/health | jq '.'

# API 정보
curl $SERVICE_URL/ | jq '.'

# PDF 생성 테스트
curl -X POST $SERVICE_URL/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "GCP Cloud Run 테스트",
    "items": [
      {"name": "배포 환경", "value": "GCP Cloud Run"},
      {"name": "리전", "value": "asia-northeast3 (서울)"},
      {"name": "자동 배포", "value": "GitHub + Cloud Build"}
    ]
  }' | jq '.'
```

### 3. 로그 확인

```bash
# 최근 로그 확인
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=n8n-pdf-generator" \
  --limit 50 \
  --format json

# 실시간 로그 스트리밍
gcloud logging tail "resource.type=cloud_run_revision AND resource.labels.service_name=n8n-pdf-generator"
```

### 4. 메트릭 확인

GCP 콘솔에서 확인:
- [Cloud Run 서비스 페이지](https://console.cloud.google.com/run)
- 서비스 선택 → **메트릭** 탭
  - 요청 수
  - 응답 시간
  - 메모리 사용량
  - CPU 사용량

---

## 🔄 CI/CD 워크플로우

### 자동 배포 프로세스

```
개발자가 코드 수정
    ↓
git push origin main
    ↓
GitHub에 코드 푸시
    ↓
Cloud Build Trigger 실행
    ↓
1. Dockerfile로 이미지 빌드
    ↓
2. Container Registry에 푸시
    ↓
3. Cloud Run에 자동 배포
    ↓
배포 완료! 🎉
```

### 배포 알림 설정 (선택사항)

Slack 또는 이메일로 배포 알림을 받을 수 있습니다.

**Slack 알림 예시:**
```yaml
# cloudbuild.yaml에 추가
- name: 'gcr.io/cloud-builders/curl'
  args:
    - '-X'
    - 'POST'
    - '-H'
    - 'Content-Type: application/json'
    - '-d'
    - '{"text":"✅ Cloud Run 배포 완료: n8n-pdf-generator"}'
    - 'YOUR_SLACK_WEBHOOK_URL'
```

---

## 🔧 고급 설정

### 1. 커스텀 도메인 설정

#### 🚀 빠른 시작 (초보자용 - 3단계)

대부분의 경우 다음 3단계만으로 충분합니다!

**1단계: 도메인 매핑 생성 (명령어 한 줄)**

```bash
# 방법 1: beta 버전 사용 (region 지정 가능)
gcloud beta run domain-mappings create \
  --service n8n-pdf-generator \
  --domain pdf.yourdomain.com \
  --region asia-northeast3

# 방법 2: GA 버전 사용 (region 선택 프롬프트)
gcloud run domain-mappings create \
  --service n8n-pdf-generator \
  --domain pdf.yourdomain.com
# 실행 후 region을 선택하는 메뉴가 나타납니다
```

> 💡 **팁**: `--region` 플래그를 직접 지정하려면 `gcloud beta` 명령어를 사용해야 합니다.

명령어 실행 후 다음과 같은 DNS 레코드 정보가 출력됩니다:
```
Please add the following DNS records to your domain:
  - Type: CNAME
  - Name: pdf
  - Value: ghs.googlehosted.com
```

**2단계: DNS 레코드 추가**

도메인 제공업체에서 CNAME 레코드를 추가합니다:

```
Type: CNAME
Name: pdf (또는 서브도메인 이름)
Value: ghs.googlehosted.com
TTL: 3600 (또는 기본값)
```

#### 제공업체별 설정 방법

<details>
<summary><b>🌐 Vercel (버셀)</b></summary>

1. [Vercel Dashboard](https://vercel.com/dashboard) → Domains 선택
2. 도메인 선택 → **DNS Records** 클릭
3. **Add Record** 클릭
4. 다음 정보 입력:
   - **Type**: CNAME
   - **Name**: pdf
   - **Value**: ghs.googlehosted.com
   - **TTL**: 3600
5. **Save** 클릭

> 💡 **팁**: Vercel에서 도메인을 구매한 경우 자동으로 Vercel DNS가 설정되어 있습니다.

</details>

<details>
<summary><b>🚀 Render</b></summary>

1. [Render Dashboard](https://dashboard.render.com/) → 도메인 선택
2. **DNS** 탭 클릭
3. **Add DNS Record** 클릭
4. 다음 정보 입력:
   - **Type**: CNAME
   - **Name**: pdf
   - **Value**: ghs.googlehosted.com
   - **TTL**: 3600 (기본값)
5. **Add Record** 클릭

> 💡 **팁**: Render에서 도메인을 호스팅하는 경우에만 가능합니다.

</details>

<details>
<summary><b>☁️ AWS Route 53</b></summary>

**웹 콘솔 방법:**
1. [Route 53 Console](https://console.aws.amazon.com/route53/) 접속
2. **Hosted zones** → 도메인 선택
3. **Create record** 클릭
4. 다음 정보 입력:
   - **Record name**: pdf
   - **Record type**: CNAME
   - **Value**: ghs.googlehosted.com
   - **TTL**: 300 (기본값)
   - **Routing policy**: Simple routing
5. **Create records** 클릭

**CLI 방법:**
```bash
# Hosted Zone ID 확인
aws route53 list-hosted-zones

# CNAME 레코드 생성
aws route53 change-resource-record-sets \
  --hosted-zone-id YOUR_ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "pdf.yourdomain.com",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [{"Value": "ghs.googlehosted.com"}]
      }
    }]
  }'

# 레코드 확인
aws route53 list-resource-record-sets \
  --hosted-zone-id YOUR_ZONE_ID \
  --query "ResourceRecordSets[?Name=='pdf.yourdomain.com.']"
```

> 💡 **팁**: Route 53 CLI를 사용하려면 AWS CLI 설치 및 인증이 필요합니다.

</details>

<details>
<summary><b>🔵 GCP Cloud DNS</b></summary>

**웹 콘솔 방법:**
1. [Cloud DNS Console](https://console.cloud.google.com/net-services/dns/zones) 접속
2. DNS 영역(Zone) 선택
3. **레코드 집합 추가** 클릭
4. 다음 정보 입력:
   - **DNS 이름**: pdf.yourdomain.com
   - **리소스 레코드 유형**: CNAME
   - **정식 이름**: ghs.googlehosted.com.
   - **TTL**: 300 (기본값)
5. **만들기** 클릭

**gcloud CLI 방법:**
```bash
# DNS 영역 목록 확인
gcloud dns managed-zones list

# CNAME 레코드 추가
gcloud dns record-sets create pdf.yourdomain.com \
  --zone="YOUR_ZONE_NAME" \
  --type="CNAME" \
  --ttl="300" \
  --rrdatas="ghs.googlehosted.com."

# 레코드 확인
gcloud dns record-sets list \
  --zone="YOUR_ZONE_NAME" \
  --filter="name:pdf.yourdomain.com"

# 레코드 삭제 (필요시)
gcloud dns record-sets delete pdf.yourdomain.com \
  --zone="YOUR_ZONE_NAME" \
  --type="CNAME"
```

> 💡 **팁**: Cloud DNS를 사용하면 같은 GCP 프로젝트 내에서 관리가 편리합니다.

</details>

<details>
<summary><b>☁️ Cloudflare</b></summary>

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → 도메인 선택
2. **DNS** → **Records** 클릭
3. **Add record** 클릭
4. 다음 정보 입력:
   - **Type**: CNAME
   - **Name**: pdf
   - **Target**: ghs.googlehosted.com
   - **Proxy status**: **DNS only** (회색 구름) ⚠️ 중요!
   - **TTL**: Auto
5. **Save** 클릭

> ⚠️ **중요**: Cloudflare의 Proxy 기능(주황색 구름)을 **반드시 끄세요**. Proxy를 켜면 Cloud Run의 SSL 인증서가 작동하지 않습니다.

</details>

<details>
<summary><b>🏠 가비아 (Gabia)</b></summary>

1. [가비아 관리콘솔](https://www.gabia.com/) 로그인
2. **My가비아** → **도메인** 선택
3. 도메인 옆 **관리** 클릭
4. **DNS 정보** → **DNS 관리도구** 클릭
5. **레코드 추가** 클릭
6. 다음 정보 입력:
   - **타입**: CNAME
   - **호스트**: pdf
   - **값/위치**: ghs.googlehosted.com
   - **TTL**: 3600
7. **저장** 클릭

</details>

<details>
<summary><b>🌍 Google Domains</b></summary>

1. [Google Domains](https://domains.google.com/) → 도메인 선택
2. **DNS** 클릭
3. **맞춤 리소스 레코드 관리** 섹션에서:
   - **이름**: pdf
   - **유형**: CNAME
   - **TTL**: 1H (또는 3600)
   - **데이터**: ghs.googlehosted.com
4. **추가** 클릭

</details>

<details>
<summary><b>🔷 Namecheap</b></summary>

1. [Namecheap Dashboard](https://ap.www.namecheap.com/dashboard) 로그인
2. **Domain List** → 도메인 선택
3. **Advanced DNS** 탭 클릭
4. **Add New Record** 클릭
5. 다음 정보 입력:
   - **Type**: CNAME Record
   - **Host**: pdf
   - **Value**: ghs.googlehosted.com
   - **TTL**: Automatic
6. **Save Changes** 클릭

</details>

<details>
<summary><b>🟦 기타 DNS 제공업체</b></summary>

대부분의 DNS 제공업체는 비슷한 방식으로 작동합니다:

1. DNS 관리 페이지 접속
2. CNAME 레코드 추가
3. 다음 정보 입력:
   - Name/Host: `pdf` (서브도메인 이름)
   - Type: `CNAME`
   - Value/Target: `ghs.googlehosted.com`
   - TTL: `3600` 또는 기본값

</details>

**3단계: 완료 확인 (5-10분 후)**

```bash
# 도메인 접속 테스트
curl https://pdf.yourdomain.com/health

# 또는 브라우저에서
# https://pdf.yourdomain.com 접속
```

✅ **끝!** Cloud Run이 자동으로 SSL 인증서를 발급하고 설정합니다.

---

#### ❓ 자주 묻는 질문 (FAQ)

**Q1: Cloud DNS를 써도 먼저 `gcloud run domain-mappings create`를 실행해야 하나요?**
A: **네, 맞습니다!** DNS 제공업체와 관계없이 먼저 Cloud Run에 도메인 매핑을 생성해야 합니다.
```bash
# 1단계: Cloud Run 도메인 매핑 생성 (필수!)
gcloud beta run domain-mappings create \
  --service n8n-pdf-generator \
  --domain pdf.yourdomain.com \
  --region asia-northeast3

# 2단계: Cloud DNS(또는 다른 DNS)에 CNAME 추가
gcloud dns record-sets create pdf.yourdomain.com \
  --zone="YOUR_ZONE" \
  --type="CNAME" \
  --rrdatas="ghs.googlehosted.com."
```
Cloud DNS, Route53, 가비아 등 어떤 DNS를 사용하든 순서는 동일합니다.

**Q2: `--region` 플래그 에러가 발생합니다. 어떻게 해결하나요?**
A: `--region` 플래그를 사용하려면 **beta 버전**을 사용해야 합니다:
```bash
# ✅ 올바른 방법
gcloud beta run domain-mappings create --service SERVICE_NAME --domain DOMAIN --region REGION

# ❌ 에러 발생
gcloud run domain-mappings create --service SERVICE_NAME --domain DOMAIN --region REGION
```
또는 `--region` 없이 실행하면 region 선택 메뉴가 나타납니다.

**Q2: 도메인 소유권 확인이 필요한가요?**
A: 대부분의 경우 **필요 없습니다**. Cloud Run은 DNS 레코드 추가만으로 자동으로 확인합니다. 단, 루트 도메인(예: yourdomain.com)을 사용하거나 Google Search Console에 도메인이 등록되어 있지 않은 경우에만 필요할 수 있습니다.

**Q2: SSL 인증서는 어떻게 발급되나요?**
A: DNS 레코드를 추가하면 Cloud Run이 **자동으로 Let's Encrypt SSL 인증서**를 발급합니다. 별도 설정 불필요! 보통 5-30분 소요됩니다.

**Q3: DNS 전파는 얼마나 걸리나요?**
A: 보통 **5-10분**이면 충분합니다. 길어도 1시간 이내에 완료됩니다.

**Q4: 루트 도메인(yourdomain.com)도 가능한가요?**
A: 가능합니다! 다만 CNAME 대신 A/AAAA 레코드를 사용해야 할 수 있습니다. DNS 제공업체가 CNAME flattening을 지원하면 CNAME도 가능합니다.

**Q5: Cloudflare를 사용하는데 작동하지 않아요.**
A: Cloudflare의 Proxy 기능(**주황색 구름**)을 끄고 **DNS only (회색 구름)**으로 설정하세요. Proxy 모드에서는 Cloud Run의 SSL 인증서가 작동하지 않습니다.

**Q6: 여러 도메인을 하나의 서비스에 연결할 수 있나요?**
A: 네! 같은 명령어를 다른 도메인으로 여러 번 실행하면 됩니다.
```bash
gcloud run domain-mappings create --service n8n-pdf-generator --domain api.yourdomain.com --region asia-northeast3
gcloud run domain-mappings create --service n8n-pdf-generator --domain pdf.yourdomain.com --region asia-northeast3
```

**Q7: 상태 확인은 어떻게 하나요?**
A: 다음 명령어로 실시간 상태를 확인할 수 있습니다:
```bash
gcloud run domain-mappings describe --domain pdf.yourdomain.com --region asia-northeast3
```

---

#### 📋 주요 명령어 요약

```bash
# 도메인 매핑 생성 (beta 버전 권장)
gcloud beta run domain-mappings create --service SERVICE_NAME --domain DOMAIN --region REGION

# 도메인 매핑 생성 (GA 버전 - region 선택 메뉴)
gcloud run domain-mappings create --service SERVICE_NAME --domain DOMAIN

# 도메인 매핑 목록
gcloud run domain-mappings list --region REGION

# 도메인 매핑 상세 정보
gcloud run domain-mappings describe --domain DOMAIN --region REGION

# 도메인 매핑 삭제
gcloud run domain-mappings delete --domain DOMAIN --region REGION
```

---

#### 📖 상세 가이드 (고급 사용자용)

위의 3단계로 해결되지 않거나 더 자세한 정보가 필요한 경우에만 참고하세요.

#### 1.1 도메인 소유권 확인

```bash
# 도메인 소유권 확인용 TXT 레코드 정보 가져오기
gcloud domains verify yourdomain.com

# 또는 Search Console에서 확인
# https://search.google.com/search-console 방문
```

도메인 제공업체(가비아, Route53 등)의 DNS 설정에서 TXT 레코드 추가:
```
Type: TXT
Name: @ (또는 루트 도메인)
Value: google-site-verification=xxxxxxxxxxxxx
```

#### 1.2 도메인 매핑 생성

```bash
# 서브도메인 매핑 (beta 버전 권장)
gcloud beta run domain-mappings create \
  --service n8n-pdf-generator \
  --domain pdf.yourdomain.com \
  --region asia-northeast3

# 루트 도메인 매핑 (선택사항)
gcloud beta run domain-mappings create \
  --service n8n-pdf-generator \
  --domain yourdomain.com \
  --region asia-northeast3
```

#### 1.3 DNS 레코드 설정 정보 확인

```bash
# 도메인 매핑 상세 정보 확인
gcloud run domain-mappings describe \
  --domain pdf.yourdomain.com \
  --region asia-northeast3

# DNS 레코드 정보만 추출
gcloud run domain-mappings describe \
  --domain pdf.yourdomain.com \
  --region asia-northeast3 \
  --format='value(status.resourceRecords)'
```

출력 예시:
```
type: A
name: pdf.yourdomain.com
rrdata: 216.239.32.21

type: AAAA
name: pdf.yourdomain.com
rrdata: 2001:4860:4802:32::15
```

#### 1.4 DNS 제공업체에 레코드 추가

**방법 A: A 레코드 사용 (IPv4)**
```
Type: A
Name: pdf (또는 pdf.yourdomain.com)
Value: 216.239.32.21
TTL: 3600
```

**방법 B: AAAA 레코드 사용 (IPv6)**
```
Type: AAAA
Name: pdf
Value: 2001:4860:4802:32::15
TTL: 3600
```

**방법 C: CNAME 레코드 사용 (권장)**
```
Type: CNAME
Name: pdf
Value: ghs.googlehosted.com
TTL: 3600
```

#### 1.5 매핑 상태 확인

```bash
# 도메인 매핑 상태 확인
gcloud run domain-mappings describe \
  --domain pdf.yourdomain.com \
  --region asia-northeast3 \
  --format='value(status.conditions)'

# 모든 도메인 매핑 목록
gcloud run domain-mappings list \
  --region asia-northeast3
```

상태가 `ACTIVE`가 될 때까지 대기 (보통 5-10분 소요):
```bash
# 상태 모니터링
watch -n 10 'gcloud run domain-mappings describe --domain pdf.yourdomain.com --region asia-northeast3 --format="value(status.conditions)"'
```

#### 1.6 SSL 인증서 확인

Cloud Run은 자동으로 Let's Encrypt SSL 인증서를 프로비저닝합니다.

```bash
# SSL 인증서 상태 확인
gcloud run domain-mappings describe \
  --domain pdf.yourdomain.com \
  --region asia-northeast3 \
  --format='value(status.certificateStatus)'
```

#### 1.7 도메인 테스트

```bash
# DNS 전파 확인
nslookup pdf.yourdomain.com

# 또는
dig pdf.yourdomain.com

# HTTPS 연결 테스트
curl -I https://pdf.yourdomain.com/health

# 전체 테스트
curl https://pdf.yourdomain.com/health | jq '.'
```

#### 1.8 여러 도메인 매핑 (Multi-domain)

```bash
# 메인 도메인
gcloud beta run domain-mappings create \
  --service n8n-pdf-generator \
  --domain pdf.yourdomain.com \
  --region asia-northeast3

# 추가 도메인 (예: 스테이징)
gcloud beta run domain-mappings create \
  --service n8n-pdf-generator \
  --domain pdf-staging.yourdomain.com \
  --region asia-northeast3

# 국제 도메인
gcloud beta run domain-mappings create \
  --service n8n-pdf-generator \
  --domain api.yourdomain.kr \
  --region asia-northeast3
```

#### 1.9 도메인 매핑 업데이트

```bash
# 기존 매핑 삭제
gcloud run domain-mappings delete \
  --domain pdf.yourdomain.com \
  --region asia-northeast3

# 새로운 매핑 생성
gcloud beta run domain-mappings create \
  --service n8n-pdf-generator-v2 \
  --domain pdf.yourdomain.com \
  --region asia-northeast3
```

#### 1.10 주요 DNS 제공업체별 설정 예시

**가비아 (Gabia):**
1. 내 도메인 → DNS 정보 → 설정
2. 레코드 추가:
   - 타입: CNAME
   - 호스트: pdf
   - 값/위치: ghs.googlehosted.com
   - TTL: 3600

**AWS Route 53:**
```bash
# Route 53 CLI로 설정
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "pdf.yourdomain.com",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [{"Value": "ghs.googlehosted.com"}]
      }
    }]
  }'
```

**Cloudflare:**
1. DNS → Add Record
2. Type: CNAME
3. Name: pdf
4. Target: ghs.googlehosted.com
5. Proxy status: DNS only (회색 구름)
6. TTL: Auto

**Google Domains:**
1. DNS → 맞춤 리소스 레코드 관리
2. 이름: pdf
3. 유형: CNAME
4. TTL: 1H
5. 데이터: ghs.googlehosted.com

#### 트러블슈팅: 커스텀 도메인

**문제 1: DNS 전파 지연**
```bash
# 여러 DNS 서버에서 확인
dig @8.8.8.8 pdf.yourdomain.com
dig @1.1.1.1 pdf.yourdomain.com

# DNS 전파 확인 (외부 도구)
# https://www.whatsmydns.net/ 방문
```

**문제 2: SSL 인증서 발급 실패**
```
ERROR: Certificate provisioning failed
```

해결:
1. DNS 레코드가 올바른지 확인
2. CAA 레코드 확인 (없어야 함 또는 letsencrypt.org 허용)
3. 30분 정도 대기 후 재시도

```bash
# CAA 레코드 확인
dig CAA yourdomain.com

# CAA 레코드가 있으면 Let's Encrypt 허용 추가
# Type: CAA
# Name: @
# Value: 0 issue "letsencrypt.org"
```

**문제 3: 도메인 매핑 실패**
```
ERROR: Domain mapping failed: Domain ownership not verified
```

해결:
```bash
# 도메인 소유권 재확인
gcloud domains verify yourdomain.com

# Google Search Console에서 확인
# https://search.google.com/search-console/welcome
```

**문제 4: CNAME 플래트닝 이슈 (루트 도메인)**

루트 도메인(예: yourdomain.com)은 CNAME을 직접 사용할 수 없음.

해결:
- DNS 제공업체가 CNAME 플래트닝을 지원하는 경우: CNAME 사용
- 그렇지 않은 경우: A 및 AAAA 레코드 사용
```bash
# A 레코드 IP 주소는 도메인 매핑 후 확인
gcloud run domain-mappings describe \
  --domain yourdomain.com \
  --region asia-northeast3 \
  --format='value(status.resourceRecords)'
```

### 2. VPC 연결 (Private S3 등)

```bash
gcloud run services update n8n-pdf-generator \
  --vpc-connector your-vpc-connector \
  --region asia-northeast3
```

### 3. 최소 인스턴스 설정 (콜드 스타트 방지)

```bash
gcloud run services update n8n-pdf-generator \
  --min-instances 1 \
  --region asia-northeast3
```

### 4. CPU Always Allocated (항상 CPU 할당)

```bash
gcloud run services update n8n-pdf-generator \
  --cpu-throttling \
  --region asia-northeast3
```

---

## 🐛 트러블슈팅

### 문제 1: 빌드 타임아웃

**증상:**
```
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
```

**해결:**
```yaml
# cloudbuild.yaml에 추가
timeout: '3600s'  # 60분
```

### 문제 2: Secret Manager 접근 권한 오류

**증상:**
```
ERROR: failed to access secret version: permission denied
```

**해결:**
```bash
# 권한 재부여
gcloud secrets add-iam-policy-binding AWS_ACCESS_KEY_ID \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 문제 3: Container Registry 푸시 실패

**증상:**
```
unauthorized: You don't have the needed permissions to perform this operation
```

**해결:**
```bash
# Docker 인증 재설정
gcloud auth configure-docker

# 또는 Cloud Build 서비스 계정에 권한 부여
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/storage.admin"
```

### 문제 4: 메모리 부족 오류

**증상:**
```
Container failed to start. Failed to start and then listen on the port defined by the PORT environment variable.
```

**해결:**
```bash
# 메모리 증가
gcloud run services update n8n-pdf-generator \
  --memory 2Gi \
  --region asia-northeast3
```

### 문제 5: GitHub Trigger 작동 안 함

**확인 사항:**
1. Cloud Build API 활성화 확인
2. GitHub 앱 설치 확인
3. 브랜치 패턴 확인 (`^main$`)
4. cloudbuild.yaml 파일 위치 확인

**수동 트리거 실행:**
```bash
gcloud builds triggers run github-auto-deploy --branch=main
```

---

## 📊 비용 예측

### Cloud Run 요금

**무료 할당량 (매월):**
- 요청 200만 건
- CPU 시간 180,000 vCPU-초
- 메모리 360,000 GiB-초
- 네트워크 1GB

**예상 비용 (무료 할당량 초과 시):**
- vCPU: $0.00002400/vCPU-초
- 메모리: $0.00000250/GiB-초
- 요청: $0.40/백만 건

**예시 계산:**
- 월 10,000건 요청
- 평균 응답 시간 2초
- 1GB 메모리, 1 vCPU

거의 무료 할당량 내에서 사용 가능!

### Cloud Build 요금

**무료 할당량 (매일):**
- 빌드 시간 120분

**예상 비용:**
- 빌드 시간: $0.003/빌드-분 (무료 할당량 초과 시)

---

## 🎓 다음 단계

1. ✅ 자동 배포 설정 완료
2. 📧 Slack/Email 알림 설정
3. 📈 Cloud Monitoring 설정
4. 🔍 Cloud Trace로 성능 모니터링
5. 🔐 IAM 권한 최소화
6. 🌐 커스텀 도메인 설정
7. 🔄 Blue-Green 배포 설정

---

## 📚 참고 링크

- [Cloud Run 문서](https://cloud.google.com/run/docs)
- [Cloud Build 문서](https://cloud.google.com/build/docs)
- [Secret Manager 문서](https://cloud.google.com/secret-manager/docs)
- [Cloud Run 가격](https://cloud.google.com/run/pricing)
- [Cloud Build 가격](https://cloud.google.com/build/pricing)

---

## 🆘 지원

문제가 발생하면:
1. [GCP 상태 대시보드](https://status.cloud.google.com/) 확인
2. [Stack Overflow](https://stackoverflow.com/questions/tagged/google-cloud-run) 검색
3. [GCP 커뮤니티](https://www.googlecloudcommunity.com/) 질문

---

**배포 완료를 축하합니다! 🎉**

이제 GitHub에 푸시할 때마다 자동으로 Cloud Run에 배포됩니다!

