export interface Response {
  limit: number;
  skip: number;
  total: number;
}

export type ResponseWithData<T, K extends string = `${Lowercase<string & T>}s`> = Response & {
  [key in K]: T[];
};
