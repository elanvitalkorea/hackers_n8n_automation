// Quote 모델 클래스
// API 응답을 Dart 객체로 변환하기 위한 클래스입니다.
class Quote {
  final String author;
  final String authorProfile;
  final String message;

  // 생성자: required 키워드로 필수 필드를 명시합니다.
  const Quote({
    required this.author,
    required this.authorProfile,
    required this.message,
  });

  // JSON을 Quote 객체로 변환하는 팩토리 생성자
  // API 응답을 받아서 Dart 객체로 변환할 때 사용합니다.
  factory Quote.fromJson(Map<String, dynamic> json) {
    return Quote(
      author: json['author'] as String,
      authorProfile: json['authorProfile'] as String,
      message: json['message'] as String,
    );
  }

  // Quote 객체를 JSON으로 변환하는 메서드 (필요시 사용)
  Map<String, dynamic> toJson() {
    return {
      'author': author,
      'authorProfile': authorProfile,
      'message': message,
    };
  }
}

