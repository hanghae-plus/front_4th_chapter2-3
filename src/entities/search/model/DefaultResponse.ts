export interface DefaultResponse {
  limit: number;
  skip: number;
  total: number;
}

export type ResponseWithData<
  T,
  K extends string = `${Lowercase<string & T>}s`,
> = DefaultResponse & {
  [key in K]: T[];
};
