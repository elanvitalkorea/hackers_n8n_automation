# 플랫폼별 환경 설정 가이드

이 문서는 iOS, Android, Web 플랫폼에서의 환경 설정을 안내합니다.

## 📋 목차

1. [공통 설정](#공통-설정)
2. [iOS 설정](#ios-설정)
3. [Android 설정](#android-설정)
4. [Web 설정](#web-설정)
5. [환경 변수 설정](#환경-변수-설정)
6. [환경 점검 체크리스트](#환경-점검-체크리스트)

---

## 공통 설정

### 1. 패키지 설치

```bash
flutter pub get
```

### 2. 환경 변수 파일 생성

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
# Upstage OCR API Configuration
UPSTAGE_API_KEY=your_api_key_here
UPSTAGE_API_ENDPOINT=https://api.upstage.ai/v1/document-digitization

# n8n Webhook URL
N8N_WEBHOOK_URL=your_webhook_url_here
```

> ⚠️ **주의**: `.env` 파일은 Git에 커밋되지 않습니다 (`.gitignore`에 포함됨)

### 3. pubspec.yaml 설정 확인

`pubspec.yaml` 파일에 다음이 포함되어 있어야 합니다:

```yaml
dependencies:
  flutter_dotenv: ^5.1.0
  image_picker: ^1.0.7
  http: ^1.2.0

flutter:
  assets:
    - .env
```

---

## iOS 설정

### 1. 권한 설정 (Info.plist)

`ios/Runner/Info.plist` 파일에 다음 권한이 설정되어 있어야 합니다:

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs access to your camera to take photos of business cards.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs access to your photo library to select business card images.</string>
```

**설정 위치**: `ios/Runner/Info.plist` 파일의 `<dict>` 섹션 내부

### 2. 실행 방법

```bash
# 시뮬레이터
flutter run -d ios

# 실제 기기 (개발자 인증서 필요)
flutter run -d <device-id>
```

### 3. 권한 확인

iOS 시뮬레이터/기기에서:
1. 앱 실행 시 권한 요청 팝업이 나타납니다
2. "허용" 선택하면 사진 라이브러리와 카메라에 접근 가능

권한이 거부된 경우:
1. 설정 → 개인정보 보호 → 사진/카메라
2. 앱을 찾아 권한을 다시 부여

---

## Android 설정

### 1. 권한 설정 (AndroidManifest.xml)

`android/app/src/main/AndroidManifest.xml` 파일에 다음 권한이 설정되어 있어야 합니다:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
    <!-- ... -->
</manifest>
```

**설정 위치**: `<manifest>` 태그 직후, `<application>` 태그 이전

### 2. 실행 방법

```bash
# 에뮬레이터
flutter run -d android

# 실제 기기
flutter run -d <device-id>
```

### 3. 권한 확인

Android 6.0+ (API 23+)에서는 런타임 권한 요청이 필요합니다:
- 앱 실행 시 권한 요청 팝업이 자동으로 나타납니다
- "허용" 선택하면 카메라와 저장소에 접근 가능

권한이 거부된 경우:
1. 설정 → 앱 → [앱 이름] → 권한
2. 필요한 권한을 수동으로 부여

---

## Web 설정

### 1. 추가 설정 없음

Web 플랫폼은 별도의 권한 설정이 필요 없습니다. 브라우저가 자동으로 파일 선택 다이얼로그를 제공합니다.

### 2. 실행 방법

```bash
flutter run -d chrome
# 또는
flutter run -d web-server
```

### 3. 주의사항

- Web에서는 `Image.file`이 지원되지 않으므로 `Image.memory`를 사용합니다
- 이미지 바이트 데이터를 직접 읽어서 처리합니다
- CORS 오류가 발생할 수 있으므로 API 서버 설정을 확인하세요

---

## 환경 변수 설정

### 1. .env 파일 생성

프로젝트 루트 디렉토리에 `.env` 파일을 생성합니다:

```bash
# .env.example 파일을 복사하여 .env 생성
cp .env.example .env
```

### 2. .env 파일 내용

```env
# Upstage OCR API Configuration
UPSTAGE_API_KEY=up_pqvc8LqGNa4INNNRwqsGNYBazFmqN
UPSTAGE_API_ENDPOINT=https://api.upstage.ai/v1/document-digitization

# n8n Webhook URL
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
```

### 3. .env 파일 확인

앱 실행 시 콘솔에 다음 로그가 표시되면 정상입니다:

```
.env 파일이 성공적으로 로드되었습니다.
```

### 4. 환경 변수 변경 후

**개발 모드**:
- `.env` 파일 수정 후 앱을 재시작해야 반영됩니다
- 핫 리로드만으로는 반영되지 않습니다

**프로덕션 빌드**:
- `.env` 파일 변경 후 다시 빌드해야 합니다
  ```bash
  flutter build web
  flutter build apk  # Android
  flutter build ios  # iOS
  ```

---

## 환경 점검 체크리스트

### ✅ 공통 체크리스트

- [ ] `flutter pub get` 실행 완료
- [ ] `.env` 파일이 프로젝트 루트에 존재
- [ ] `.env` 파일에 `UPSTAGE_API_KEY` 설정됨
- [ ] `.env` 파일에 `UPSTAGE_API_ENDPOINT` 설정됨
- [ ] `.env` 파일에 `N8N_WEBHOOK_URL` 설정됨
- [ ] `pubspec.yaml`에 `flutter_dotenv` 패키지 추가됨
- [ ] `pubspec.yaml`의 `assets`에 `.env` 포함됨
- [ ] `.gitignore`에 `.env` 포함됨 (보안)

### ✅ iOS 체크리스트

- [ ] `ios/Runner/Info.plist`에 `NSCameraUsageDescription` 설정됨
- [ ] `ios/Runner/Info.plist`에 `NSPhotoLibraryUsageDescription` 설정됨
- [ ] 앱 실행 시 권한 요청 팝업 확인
- [ ] 갤러리 버튼 클릭 시 사진 라이브러리 열림
- [ ] 카메라 버튼 클릭 시 카메라 앱 열림

### ✅ Android 체크리스트

- [ ] `android/app/src/main/AndroidManifest.xml`에 `CAMERA` 권한 설정됨
- [ ] `android/app/src/main/AndroidManifest.xml`에 `READ_EXTERNAL_STORAGE` 권한 설정됨
- [ ] `android/app/src/main/AndroidManifest.xml`에 `READ_MEDIA_IMAGES` 권한 설정됨 (Android 13+)
- [ ] 앱 실행 시 런타임 권한 요청 확인
- [ ] 갤러리 버튼 클릭 시 갤러리 앱 열림
- [ ] 카메라 버튼 클릭 시 카메라 앱 열림

### ✅ Web 체크리스트

- [ ] 브라우저에서 앱 실행 시 `.env` 로드 확인
- [ ] 콘솔에 환경변수 로드 로그 표시
- [ ] 갤러리 버튼 클릭 시 파일 선택 다이얼로그 표시
- [ ] 이미지 선택 후 정상적으로 표시됨

---

## 문제 해결

### 환경 변수를 찾을 수 없음

**증상**: `UPSTAGE_API_KEY가 설정되지 않았습니다` 오류

**해결 방법**:
1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. `.env` 파일 내용 확인 (공백, 따옴표 등)
3. `pubspec.yaml`의 `assets`에 `.env` 포함 확인
4. 앱 재시작

### 권한이 거부됨

**증상**: 갤러리 버튼 클릭 시 반응 없음

**해결 방법**:
- **iOS**: 설정 → 개인정보 보호 → 사진/카메라
- **Android**: 설정 → 앱 → 권한

### 이미지가 표시되지 않음

**증상**: 이미지 선택 후 화면에 표시되지 않음

**해결 방법**:
1. 콘솔 에러 확인
2. 이미지 파일 형식 확인 (JPG, PNG 지원)
3. 파일 크기 확인 (너무 큰 파일은 문제 발생 가능)

---

## 파일 구조 요약

```
프로젝트 루트/
├── .env                    # 환경 변수 (Git에 커밋되지 않음)
├── .env.example           # 환경 변수 템플릿 (Git에 커밋됨)
├── pubspec.yaml           # 패키지 및 assets 설정
├── lib/
│   ├── main.dart          # dotenv 초기화
│   └── utils/
│       └── constants.dart # 환경변수 접근
├── ios/
│   └── Runner/
│       └── Info.plist    # iOS 권한 설정
└── android/
    └── app/
        └── src/
            └── main/
                └── AndroidManifest.xml  # Android 권한 설정
```

---

## 참고 자료

- [flutter_dotenv 문서](https://pub.dev/packages/flutter_dotenv)
- [image_picker 문서](https://pub.dev/packages/image_picker)
- [Flutter 플랫폼별 설정 가이드](https://docs.flutter.dev/deployment/)

---

**마지막 업데이트**: 2024년 11월 6일

