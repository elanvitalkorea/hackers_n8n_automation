// Node.js의 파일 시스템 모듈을 불러옵니다.
const fs = require('fs');

// 입력 파일과 출력 파일의 경로를 변수로 지정합니다.
const inputFilePath = 'n8n_doc_api_reponse.json';
const outputFilePath = 'n8n-doc-transformed.md';

/**
 * Firecrawl API 응답을 지정된 마크다운 형식으로 변환합니다.
 * @param {object} apiResponse - Firecrawl /crawl 엔드포인트의 JSON 응답 객체.
 * @returns {string} - <page> 태그로 각 페이지가 래핑된 마크다운 형식의 문자열.
 */
function transformFirecrawlResponseToMarkdown(apiResponse) {
  if (!apiResponse || !apiResponse.data || apiResponse.data.length === 0) {
    return "";
  }

  const pages = apiResponse.data.map(pageData => {
    const title = pageData.metadata?.title || 'No Title';
    const url = pageData.metadata?.sourceURL || 'No URL';
    const content = pageData.markdown || 'No Content';

    return `
<page>
  <title>${title}</title>
  <url>${url}</url>
  <content>
${content}
  </content>
</page>
    `.trim();
  });

  return pages.join('\n\n');
}

// --- 메인 실행 로직 ---
try {
  console.log(`'${inputFilePath}' 파일 읽는 중...`);

  // 1. 입력 파일을 동기적으로 읽고, UTF-8 인코딩으로 텍스트를 가져옵니다.
  const fileContent = fs.readFileSync(inputFilePath, 'utf8');

  // 2. 읽어온 JSON 텍스트를 JavaScript 객체로 변환(파싱)합니다.
  const apiResponse = JSON.parse(fileContent);

  console.log('데이터 변환 중...');
  // 3. 변환 함수를 호출하여 마크다운 문자열을 생성합니다.
  const formattedMarkdown = transformFirecrawlResponseToMarkdown(apiResponse);

  // 4. 변환된 결과를 지정된 출력 파일에 씁니다.
  fs.writeFileSync(outputFilePath, formattedMarkdown);

  console.log(`✅ 변환 완료! 결과가 '${outputFilePath}' 파일에 저장되었습니다.`);

} catch (error) {
  console.error('오류가 발생했습니다:', error.message);
}