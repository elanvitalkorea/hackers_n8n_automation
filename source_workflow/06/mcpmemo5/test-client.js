#!/usr/bin/env node

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MemoTestClient {
  constructor() {
    this.client = null;
    this.serverProcess = null;
  }

  async start() {
    console.log('🚀 MCP 메모 서버 테스트 시작...\n');

    try {
      // 서버 프로세스 시작
      const serverPath = path.join(__dirname, 'index.js');
      this.serverProcess = spawn('node', [serverPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
          ...process.env,
          SUPABASE_URL: 'https://wdbqdtqwctavmtklfvxm.supabase.co',
          SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkYnFkdHF3Y3Rhdm10a2xmdnhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMTMxODIsImV4cCI6MjA3Mjg4OTE4Mn0.fIFLlcrvc4-_6Za2lZ63ZsU2A741KKtIKaPgvmV4KoM'
        }
      });

      // 서버 시작 대기
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 클라이언트 연결
      const transport = new StdioClientTransport({
        command: 'node',
        args: [serverPath],
        env: {
          ...process.env,
          SUPABASE_URL: 'https://wdbqdtqwctavmtklfvxm.supabase.co',
          SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkYnFkdHF3Y3Rhdm10a2xmdnhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMTMxODIsImV4cCI6MjA3Mjg4OTE4Mn0.fIFLlcrvc4-_6Za2lZ63ZsU2A741KKtIKaPgvmV4KoM'
        }
      });

      this.client = new Client(
        {
          name: 'memo-test-client',
          version: '1.0.0',
        },
        {
          capabilities: {},
        }
      );

      await this.client.connect(transport);
      console.log('✅ MCP 서버에 연결되었습니다.\n');

      // 테스트 실행
      await this.runTests();
    } catch (error) {
      console.error('❌ 연결 실패:', error.message);
    }
  }

  async runTests() {
    try {
      // 1. 도구 목록 확인
      console.log('📋 1. 도구 목록 확인');
      const tools = await this.client.listTools();
      console.log('사용 가능한 도구:', tools.tools.map(t => t.name));
      console.log('');

      // 2. 리소스 목록 확인
      console.log('📁 2. 리소스 목록 확인');
      const resources = await this.client.listResources();
      console.log('사용 가능한 리소스:', resources.resources.map(r => r.name));
      console.log('');

      // 3. 프롬프트 목록 확인
      console.log('💬 3. 프롬프트 목록 확인');
      const prompts = await this.client.listPrompts();
      console.log('사용 가능한 프롬프트:', prompts.prompts.map(p => p.name));
      console.log('');

      // 4. 메모 생성 테스트
      console.log('➕ 4. 메모 생성 테스트');
      const createResult1 = await this.client.callTool({
        name: 'create_memo',
        arguments: { content: '강아지와 해변 산책 계획', category: '개인' }
      });
      console.log('메모 생성 결과:', createResult1.content[0].text);

      const createResult2 = await this.client.callTool({
        name: 'create_memo',
        arguments: { content: '프로젝트 회의 준비사항 정리', category: '업무' }
      });
      console.log('메모 생성 결과:', createResult2.content[0].text);
      console.log('');

      // 5. 리소스 읽기 테스트
      console.log('📖 5. 리소스 읽기 테스트');
      const allMemosResult = await this.client.readResource({
        uri: 'memo://all-memos'
      });
      console.log('전체 메모 데이터베이스:');
      console.log(allMemosResult.contents[0].text);
      console.log('');

      const categoriesResult = await this.client.readResource({
        uri: 'memo://categories'
      });
      console.log('카테고리 정보:');
      console.log(categoriesResult.contents[0].text);
      console.log('');

      // 6. 메모 검색 테스트
      console.log('🔍 6. 메모 검색 테스트');
      const searchResult = await this.client.callTool({
        name: 'search_memos',
        arguments: { query: '산책', category: '개인' }
      });
      console.log('메모 검색 결과:', searchResult.content[0].text);
      console.log('');

      // 7. 프롬프트 테스트
      console.log('💬 7. 프롬프트 테스트');
      const assistantPrompt = await this.client.getPrompt({
        name: 'memo_assistant',
        arguments: { user_intent: '메모 생성 및 관리' }
      });
      console.log('메모 어시스턴트 프롬프트:', assistantPrompt.messages[0].content.text.substring(0, 200) + '...');
      console.log('');

      // 8. 메모 삭제 테스트
      console.log('🗑️ 8. 메모 삭제 테스트');
      const memos = JSON.parse(allMemosResult.contents[0].text);
      if (memos.length > 0) {
        const deleteResult = await this.client.callTool({
          name: 'delete_memo',
          arguments: { id: memos[0].id }
        });
        console.log('메모 삭제 결과:', deleteResult.content[0].text);
      }
      console.log('');

      // 9. 최종 상태 확인
      console.log('📊 9. 최종 상태 확인');
      const finalResource = await this.client.readResource({
        uri: 'memo://all-memos'
      });
      console.log('최종 메모 상태:');
      console.log(finalResource.contents[0].text);

      console.log('\n✅ 모든 테스트가 성공적으로 완료되었습니다!');

    } catch (error) {
      console.error('❌ 테스트 중 오류 발생:', error.message);
    } finally {
      await this.cleanup();
    }
  }

  async cleanup() {
    if (this.client) {
      await this.client.close();
    }
    if (this.serverProcess) {
      this.serverProcess.kill();
    }
    console.log('\n🧹 리소스 정리 완료');
  }
}

const testClient = new MemoTestClient();
testClient.start().catch(console.error);
