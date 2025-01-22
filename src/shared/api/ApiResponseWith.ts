interface ApiResponse {
  limit: number;
  skip: number;
  total: number;
}

/**
 * API 응답 데이터 타입
 */
export type ApiResponseWith<T, K extends string = `${Lowercase<string & T>}s`> = ApiResponse & {
  [key in K]: T[];
};
