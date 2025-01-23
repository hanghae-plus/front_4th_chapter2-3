/**
 * 텍스트 내에서 검색어와 일치하는 부분을 하이라이트 처리하는 유틸리티 함수
 *
 * @param text - 하이라이트할 원본 텍스트
 * @param query - 검색어 (하이라이트할 텍스트)
 * @returns 하이라이트된 텍스트를 포함한 React 엘리먼트 또는 원본 텍스트
 *
 * @example
 * // 기본 사용법
 * highlightText("Hello World", "world")
 * // 결과: Hello <span className="bg-yellow-200">World</span>
 *
 * // 검색어가 없는 경우
 * highlightText("Hello World", "")
 * // 결과: Hello World
 */
export const highlightText = (text: string, query: string) => {
  // 검색어가 없으면 원본 텍스트 반환
  if (!query) return text;

  // 검색어를 기준으로 텍스트를 분할 (대소문자 구분 없이)
  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  // 분할된 각 부분을 매핑하여 검색어와 일치하는 부분만 하이라이트 처리
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      // 일치하는 부분: 노란색 배경의 span으로 감싸기
      <span key={i} className='bg-yellow-200'>
        {part}
      </span>
    ) : (
      // 일치하지 않는 부분: 그대로 반환
      part
    ),
  );
};
