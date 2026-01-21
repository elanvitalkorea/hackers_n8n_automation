#!/bin/bash

echo "=========================================="
echo "플랫폼 환경 설정 점검 스크립트"
echo "=========================================="
echo ""

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 체크 함수
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1"
        return 1
    fi
}

error_count=0

echo "=== 공통 설정 ==="
echo ""

# .env 파일 확인
if [ -f .env ]; then
    check ".env 파일 존재"
    
    # 환경변수 확인
    if grep -q "UPSTAGE_API_KEY" .env && grep -q "N8N_WEBHOOK_URL" .env; then
        check ".env 파일에 필수 환경변수 설정됨"
    else
        echo -e "${RED}✗${NC} .env 파일에 필수 환경변수가 누락됨"
        error_count=$((error_count + 1))
    fi
else
    echo -e "${RED}✗${NC} .env 파일이 없습니다"
    error_count=$((error_count + 1))
fi

# pubspec.yaml 확인
if grep -q "flutter_dotenv" pubspec.yaml; then
    check "pubspec.yaml에 flutter_dotenv 패키지 포함됨"
else
    echo -e "${RED}✗${NC} pubspec.yaml에 flutter_dotenv 패키지가 없습니다"
    error_count=$((error_count + 1))
fi

if grep -q "\.env" pubspec.yaml; then
    check "pubspec.yaml의 assets에 .env 포함됨"
else
    echo -e "${RED}✗${NC} pubspec.yaml의 assets에 .env가 없습니다"
    error_count=$((error_count + 1))
fi

echo ""
echo "=== iOS 설정 ==="
echo ""

if [ -f ios/Runner/Info.plist ]; then
    if grep -q "NSPhotoLibraryUsageDescription" ios/Runner/Info.plist; then
        check "iOS Info.plist에 NSPhotoLibraryUsageDescription 설정됨"
    else
        echo -e "${RED}✗${NC} iOS Info.plist에 NSPhotoLibraryUsageDescription이 없습니다"
        error_count=$((error_count + 1))
    fi
    
    if grep -q "NSCameraUsageDescription" ios/Runner/Info.plist; then
        check "iOS Info.plist에 NSCameraUsageDescription 설정됨"
    else
        echo -e "${RED}✗${NC} iOS Info.plist에 NSCameraUsageDescription이 없습니다"
        error_count=$((error_count + 1))
    fi
else
    echo -e "${YELLOW}⚠${NC} iOS 설정 파일이 없습니다"
fi

echo ""
echo "=== Android 설정 ==="
echo ""

if [ -f android/app/src/main/AndroidManifest.xml ]; then
    if grep -q "android.permission.CAMERA" android/app/src/main/AndroidManifest.xml; then
        check "AndroidManifest.xml에 CAMERA 권한 설정됨"
    else
        echo -e "${RED}✗${NC} AndroidManifest.xml에 CAMERA 권한이 없습니다"
        error_count=$((error_count + 1))
    fi
    
    if grep -q "READ_EXTERNAL_STORAGE" android/app/src/main/AndroidManifest.xml || grep -q "READ_MEDIA_IMAGES" android/app/src/main/AndroidManifest.xml; then
        check "AndroidManifest.xml에 저장소 읽기 권한 설정됨"
    else
        echo -e "${RED}✗${NC} AndroidManifest.xml에 저장소 읽기 권한이 없습니다"
        error_count=$((error_count + 1))
    fi
else
    echo -e "${YELLOW}⚠${NC} Android 설정 파일이 없습니다"
fi

echo ""
echo "=== Web 설정 ==="
echo ""
echo -e "${GREEN}✓${NC} Web 플랫폼은 추가 설정이 필요 없습니다"

echo ""
echo "=========================================="
if [ $error_count -eq 0 ]; then
    echo -e "${GREEN}모든 설정이 완료되었습니다!${NC}"
    echo ""
    echo "다음 명령어로 실행하세요:"
    echo "  - iOS: flutter run -d ios"
    echo "  - Android: flutter run -d android"
    echo "  - Web: flutter run -d chrome"
    exit 0
else
    echo -e "${RED}총 ${error_count}개의 문제가 발견되었습니다.${NC}"
    echo ""
    echo "자세한 내용은 docs/platform_setup_guide.md를 참고하세요."
    exit 1
fi
