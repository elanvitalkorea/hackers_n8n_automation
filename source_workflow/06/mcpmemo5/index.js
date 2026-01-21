#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEMO_FILE = path.join(__dirname, 'memo.json');

// Supabase 설정
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL과 API Key가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

class MemoMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'memo-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
          prompts: {},
        },
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // Tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'create_memo',
            title: '메모 생성',
            description: '사용자로부터 메모 내용을 입력받아 새로운 메모를 생성하고 저장하는 기능입니다. 일상적인 생각, 할 일, 중요한 정보 등을 기록할 때 사용됩니다.',
            inputSchema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  description: '저장할 메모의 내용입니다. (예: "강아지와 산책하기", "회의 준비사항 정리")',
                },
                category: {
                  type: 'string',
                  description: '메모의 카테고리입니다. (선택사항: "개인", "업무", "학습", "일상" 등)',
                },
              },
              required: ['content'],
            },
          },
          {
            name: 'search_memos',
            title: '메모 검색',
            description: '저장된 메모들 중에서 특정 키워드나 내용을 포함한 메모를 찾아주는 기능입니다. 과거에 기록한 정보를 빠르게 찾을 때 사용됩니다.',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: '검색할 키워드입니다. (예: "산책", "회의", "강아지")',
                },
                category: {
                  type: 'string',
                  description: '검색할 카테고리입니다. (선택사항: "개인", "업무", "학습", "일상" 등)',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'update_memo',
            title: '메모 수정',
            description: '기존 메모의 내용을 수정하거나 업데이트하는 기능입니다. 메모 내용이 변경되었거나 추가 정보가 필요할 때 사용됩니다.',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: '수정할 메모의 고유 ID입니다.',
                },
                content: {
                  type: 'string',
                  description: '수정된 메모 내용입니다.',
                },
                category: {
                  type: 'string',
                  description: '수정된 메모의 카테고리입니다. (선택사항)',
                },
              },
              required: ['id', 'content'],
            },
          },
          {
            name: 'delete_memo',
            title: '메모 삭제',
            description: '더 이상 필요하지 않은 메모를 완전히 삭제하는 기능입니다. 메모가 중복되었거나 관련이 없어졌을 때 사용됩니다.',
            inputSchema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: '삭제할 메모의 고유 ID입니다.',
                },
              },
              required: ['id'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'create_memo':
            return await this.createMemo(args.content, args.category);
          case 'search_memos':
            return await this.searchMemos(args.query, args.category);
          case 'update_memo':
            return await this.updateMemo(args.id, args.content, args.category);
          case 'delete_memo':
            return await this.deleteMemo(args.id);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });

    // Resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'memo://all-memos',
            name: '전체 메모 데이터베이스',
            title: '메모 데이터베이스',
            description: '사용자가 저장한 모든 메모의 전체 데이터베이스입니다. 메모 내용, 생성일시, 카테고리 정보가 포함되어 있으며, 메모 검색이나 관리 시 참고할 수 있습니다.',
            mimeType: 'application/json',
          },
          {
            uri: 'memo://categories',
            name: '메모 카테고리 목록',
            title: '카테고리 정보',
            description: '메모를 분류하는 데 사용할 수 있는 카테고리 목록입니다. 개인, 업무, 학습, 일상 등의 카테고리로 메모를 체계적으로 관리할 수 있습니다.',
            mimeType: 'application/json',
          },
          {
            uri: 'memo://recent-memos',
            name: '최근 메모',
            title: '최근 메모 목록',
            description: '최근에 생성되거나 수정된 메모들의 목록입니다. 최신 활동을 확인하거나 빠른 참조가 필요할 때 사용됩니다.',
            mimeType: 'application/json',
          },
        ],
      };
    });

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      try {
        if (uri === 'memo://all-memos') {
          const memos = await this.loadMemos();
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(memos, null, 2),
              },
            ],
          };
        } else if (uri === 'memo://categories') {
          const categories = ['개인', '업무', '학습', '일상', '여행', '건강', '취미', '기타'];
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify({ categories, description: '메모 분류에 사용할 수 있는 카테고리 목록' }, null, 2),
              },
            ],
          };
        } else if (uri === 'memo://recent-memos') {
          const memos = await this.loadMemos();
          const recentMemos = memos.slice(0, 10); // 최근 10개
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify({ recentMemos, total: memos.length }, null, 2),
              },
            ],
          };
        }

        throw new Error(`Unknown resource: ${uri}`);
      } catch (error) {
        return {
          contents: [
            {
              uri,
              mimeType: 'text/plain',
              text: `Error loading resource: ${error.message}`,
            },
          ],
        };
      }
    });

    // Prompts
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
      return {
        prompts: [
          {
            name: 'memo_assistant',
            title: '메모 관리 어시스턴트',
            description: '친절하고 체계적인 개인 메모 관리 어시스턴트의 역할로, 사용자의 메모 생성, 검색, 수정, 삭제를 도와주는 대화 시나리오입니다. 사용자의 의도를 정확히 파악하고 적절한 메모 관리 작업을 수행합니다. 이 프롬프트는 메모 관련 모든 요청의 진입점 역할을 합니다.',
            arguments: [
              {
                name: 'user_request',
                description: '사용자의 메모 관련 요청 내용 (예: "강아지와 산책 메모 추가해줘", "산책 관련 메모 찾아줘")',
                required: false,
              },
            ],
          },
          {
            name: 'memo_organizer',
            title: '메모 정리 및 분류',
            description: '메모를 카테고리별로 정리하고 분류하는 전문가의 역할로, 사용자의 메모를 체계적으로 관리하고 관련된 메모들을 그룹화하여 제공하는 시나리오입니다.',
            arguments: [
              {
                name: 'category',
                description: '정리할 카테고리 (개인, 업무, 학습, 일상 등)',
                required: false,
              },
            ],
          },
          {
            name: 'memo_search_expert',
            title: '메모 검색 전문가',
            description: '효율적인 메모 검색과 정보 추출을 담당하는 전문가의 역할로, 사용자가 찾고자 하는 정보를 빠르고 정확하게 찾아주는 시나리오입니다.',
            arguments: [
              {
                name: 'search_context',
                description: '검색 컨텍스트나 목적',
                required: false,
              },
            ],
          },
        ],
      };
    });

    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'memo_assistant':
          const userRequest = args?.user_request || '메모 관리 요청';
          return {
            description: '메모 관리 어시스턴트 - 메인 진입점',
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `당신은 전문적인 메모 관리 어시스턴트입니다. 사용자의 요청("${userRequest}")을 분석하고 다음과 같이 행동해주세요:

🎯 **주요 역할:**
- 사용자의 메모 관련 요청을 정확히 이해하고 분석
- 적절한 메모 관리 도구를 선택하여 실행
- 카테고리 자동 분류 및 추천
- 친절하고 체계적인 응답 제공

🛠️ **사용 가능한 도구:**
1. create_memo: 새 메모 생성 (내용, 카테고리)
2. search_memos: 메모 검색 (키워드, 카테고리별)
3. update_memo: 기존 메모 수정
4. delete_memo: 메모 삭제

📋 **카테고리 시스템:**
- 개인: 강아지, 산책, 가족, 친구, 취미
- 업무: 회의, 프로젝트, 클라이언트, 보고서
- 학습: 공부, 책, 강의, 교육
- 일상: 쇼핑, 식사, 청소, 정리
- 여행: 휴가, 여행지, 호텔, 항공
- 건강: 운동, 병원, 의사, 약
- 취미: 게임, 영화, 음악, 요리

📊 **현재 메모 데이터:**
{{memos}}

💡 **지침:**
1. 사용자 요청을 분석하여 적절한 action을 결정
2. 카테고리가 명시되지 않으면 내용을 분석하여 자동 분류
3. 검색 요청시 관련성 높은 결과 우선 제시
4. 항상 사용자에게 도움이 되는 추가 정보나 제안 제공`,
                },
              },
            ],
          };
        case 'memo_organizer':
          const category = args?.category || '전체';
          return {
            description: '메모 정리 및 분류 전문가 역할',
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `당신은 메모 정리 및 분류 전문가입니다. "${category}" 카테고리의 메모를 중심으로 다음과 같이 도와주세요:

1. 관련된 메모들을 그룹화하여 제시합니다
2. 메모의 우선순위나 중요도를 분석합니다
3. 중복되거나 정리가 필요한 메모를 식별합니다
4. 체계적인 메모 관리 방안을 제안합니다
5. 카테고리별로 메모를 효율적으로 분류합니다

메모 데이터: {{memos}}`,
                },
              },
            ],
          };
        case 'memo_search_expert':
          const context = args?.search_context || '일반 검색';
          return {
            description: '메모 검색 전문가 역할',
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: `당신은 메모 검색 전문가입니다. 검색 컨텍스트("${context}")에 따라 다음과 같이 도와주세요:

1. 사용자가 찾는 정보를 정확히 파악합니다
2. 관련성 높은 메모들을 우선적으로 제시합니다
3. 검색 결과를 의미있는 그룹으로 분류합니다
4. 검색 키워드나 필터링 옵션을 제안합니다
5. 찾고자 하는 정보가 없을 경우 대안을 제시합니다

검색 대상 메모: {{memos}}`,
                },
              },
            ],
          };
        default:
          throw new Error(`Unknown prompt: ${name}`);
      }
    });
  }

  async loadMemos() {
    try {
      const { data, error } = await supabase
        .from('memos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Supabase 오류: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('메모 로드 오류:', error);
      return [];
    }
  }

  inferCategory(content) {
    const lowerContent = content.toLowerCase();
    
    // 카테고리 키워드 매핑
    const categoryKeywords = {
      '업무': ['회의', '프로젝트', '업무', '클라이언트', '보고서', '발표', '계획'],
      '개인': ['강아지', '산책', '개인', '가족', '친구', '취미'],
      '학습': ['공부', '학습', '책', '강의', '교육', '독서'],
      '일상': ['일상', '쇼핑', '식사', '청소', '정리'],
      '여행': ['여행', '휴가', '여행지', '호텔', '항공'],
      '건강': ['운동', '건강', '병원', '의사', '약'],
      '취미': ['게임', '영화', '음악', '요리', '그림']
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => lowerContent.includes(keyword))) {
        return category;
      }
    }
    
    return '일상'; // 기본값
  }

  async createMemo(content, category = null) {
    try {
      // 카테고리 자동 추론
      if (!category) {
        category = this.inferCategory(content);
      }

      const newMemo = {
        content,
        category,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('memos')
        .insert([newMemo])
        .select()
        .single();

      if (error) {
        throw new Error(`Supabase 오류: ${error.message}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: `✅ 메모가 생성되었습니다!\n📝 내용: ${content}\n🏷️ 카테고리: ${category || '일상'}\n🆔 ID: ${data.id}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`메모 생성 실패: ${error.message}`);
    }
  }

  async searchMemos(query, category = null) {
    try {
      let supabaseQuery = supabase
        .from('memos')
        .select('*')
        .ilike('content', `%${query}%`);

      if (category) {
        supabaseQuery = supabaseQuery.eq('category', category);
      }

      const { data, error } = await supabaseQuery.order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Supabase 오류: ${error.message}`);
      }

      const results = data || [];
      return {
        content: [
          {
            type: 'text',
            text: `🔍 "${query}" 검색 결과: ${results.length}개의 메모를 찾았습니다.\n\n${results.map((memo, index) => 
              `${index + 1}. 📝 ${memo.content}\n   🏷️ 카테고리: ${memo.category || '미분류'}\n   🆔 ID: ${memo.id}\n   📅 생성일: ${memo.created_at}\n`
            ).join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`메모 검색 실패: ${error.message}`);
    }
  }

  async updateMemo(id, content, category = null) {
    try {
      const updateData = { content };
      if (category) {
        updateData.category = category;
      }

      const { data, error } = await supabase
        .from('memos')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error(`메모를 찾을 수 없습니다: ${id}`);
        }
        throw new Error(`Supabase 오류: ${error.message}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: `메모가 수정되었습니다. ID: ${id}${category ? `, 카테고리: ${category}` : ''}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`메모 수정 실패: ${error.message}`);
    }
  }

  async deleteMemo(id) {
    try {
      const { data, error } = await supabase
        .from('memos')
        .delete()
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error(`메모를 찾을 수 없습니다: ${id}`);
        }
        throw new Error(`Supabase 오류: ${error.message}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: `🗑️ 메모가 삭제되었습니다. ID: ${id}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`메모 삭제 실패: ${error.message}`);
    }
  }

  async organizeMemos(context = '전체') {
    try {
      const memos = await this.loadMemos();
      
      // 카테고리별로 그룹화
      const groupedMemos = memos.reduce((groups, memo) => {
        const category = memo.category || '미분류';
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(memo);
        return groups;
      }, {});

      const organizationText = Object.entries(groupedMemos)
        .map(([category, categoryMemos]) => {
          return `📁 ${category} (${categoryMemos.length}개)\n${categoryMemos.map((memo, index) => 
            `   ${index + 1}. 📝 ${memo.content}\n      🆔 ${memo.id}\n`
          ).join('')}`;
        }).join('\n');

      return {
        content: [
          {
            type: 'text',
            text: `📋 메모 정리 결과 (${context})\n\n총 ${memos.length}개의 메모가 있습니다:\n\n${organizationText}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`메모 정리 실패: ${error.message}`);
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Memo MCP Server started');
  }
}

const server = new MemoMCPServer();
server.run().catch(console.error);
