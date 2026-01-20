첫 번째 할 일부터 진행합니다.


[4 tools called]

모델 클래스와 상수 파일 생성 중.


[3 tools called]

Upstage OCR API 서비스 구현 중.


[2 tools called]

OCR 서비스 구현 중. 일반적인 REST API 패턴으로 구현합니다.


[2 tools called]

n8n 서비스 구현 중.


[2 tools called]

홈 화면 구현 중.


[2 tools called]

명함 인식 및 편집 화면 구현 중.


[2 tools called]

경고 수정 중: 사용하지 않는 필드 제거.


[3 tools called]

히스토리/설정 화면과 하단 네비게이션 바 구현 중.


[4 tools called]

main.dart 업데이트 중: 하단 네비게이션 바와 메인 화면 구성.


[2 tools called]

Android와 iOS 권한 설정 중.


[2 tools called]

Android와 iOS 권한 추가 중.


[4 tools called]

사용하지 않는 필드 제거 중.


[2 tools called]

모든 할 일을 완료했습니다. 최종 확인을 위해 OCR 서비스의 API 엔드포인트와 요청 형식을 확인 중입니다.


[1 tool called]

Upstage Document OCR API 문서에서 명함 인식 관련 정보 확인 중.


[1 tool called]

OCR API 요청 형식 수정: multipart/form-data로 파일을 직접 전송하도록 변경.


[4 tools called]

작업 완료.

## 구현 완료 사항

### 1. **의존성 추가**
- `image_picker`: 카메라/갤러리 접근
- `http`: HTTP 요청

### 2. **모델 및 상수**
- `BusinessCard` 모델 클래스
- API 키 및 엔드포인트 상수

### 3. **서비스 레이어**
- **OCR 서비스**: Upstage OCR API 연동 (multipart/form-data 형식)
- **n8n 서비스**: 웹훅 전송 서비스

### 4. **화면 구현**
- **홈 화면**: 카메라/갤러리 선택, 다크 테마
- **명함 인식 화면**: OCR 인식, 편집 가능한 폼 필드, n8n 전송
- **히스토리 화면**: 기본 구조 (빈 화면)
- **설정 화면**: 기본 구조 (빈 화면)

### 5. **네비게이션**
- 하단 네비게이션 바 (Home, History, Settings)
- 메인 화면 라우팅 구성

### 6. **권한 설정**
- Android: 카메라, 저장소 권한
- iOS: 카메라, 사진 라이브러리 권한

## 주요 기능

1. 카메라/갤러리에서 명함 이미지 선택
2. Upstage OCR API로 텍스트 인식
3. 인식된 내용을 폼에 자동 채우기 (이름, 이메일, 전화, 회사명, 직책, 홈페이지, 주소)
4. 폼 내용 수정 가능
5. n8n 웹훅으로 명함 데이터 전송

## 참고 사항

- n8n 웹훅 URL은 `lib/utils/constants.dart`의 `n8nWebhookUrl`을 실제 URL로 변경하세요.
- OCR 응답 파싱은 기본 로직으로 구현되어 있습니다. 필요에 따라 정교화하세요.
- `flutter pub get`을 실행하여 패키지를 설치하세요.

모든 할 일이 완료되었습니다.