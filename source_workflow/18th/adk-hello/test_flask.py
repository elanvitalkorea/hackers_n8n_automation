#!/usr/bin/env python3
"""Flask 앱 테스트 스크립트"""
import sys
import requests
import time
import subprocess
import os

def test_flask_app():
    """Flask 앱이 정상 작동하는지 테스트"""
    print("=" * 50)
    print("Flask 앱 테스트 시작")
    print("=" * 50)
    
    # 1. Import 테스트
    print("\n1. Import 테스트...")
    try:
        from app import app, runner
        print("   ✅ Flask app import 성공")
        print("   ✅ Runner import 성공")
    except Exception as e:
        print(f"   ❌ Import 실패: {e}")
        return False
    
    # 2. 앱 구조 테스트
    print("\n2. 앱 구조 테스트...")
    try:
        assert hasattr(app, 'route'), "Flask app에 route가 없습니다"
        assert runner is not None, "Runner가 None입니다"
        print("   ✅ 앱 구조 정상")
    except AssertionError as e:
        print(f"   ❌ 앱 구조 문제: {e}")
        return False
    
    # 3. 서버 시작 테스트 (간단한 검증만)
    print("\n3. 서버 시작 가능 여부 확인...")
    try:
        # 앱 컨텍스트에서 테스트
        with app.test_client() as client:
            # Health check 테스트
            response = client.get('/api/health')
            assert response.status_code == 200, f"Health check 실패: {response.status_code}"
            data = response.get_json()
            assert data['status'] == 'ok', "Health check 응답이 올바르지 않습니다"
            print("   ✅ Health check 엔드포인트 정상")
            
            # 루트 경로 테스트
            response = client.get('/')
            assert response.status_code == 200, f"루트 경로 실패: {response.status_code}"
            print("   ✅ 루트 경로 정상")
            
    except Exception as e:
        print(f"   ❌ 서버 테스트 실패: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    print("\n" + "=" * 50)
    print("✅ 모든 테스트 통과! Flask 앱이 정상 작동합니다.")
    print("=" * 50)
    print("\n실행 방법:")
    print("  uv run python app.py")
    print("  또는")
    print("  python app.py")
    print("\n브라우저에서 http://localhost:5001 접속")
    return True

if __name__ == '__main__':
    success = test_flask_app()
    sys.exit(0 if success else 1)



