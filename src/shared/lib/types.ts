export type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type PartialOmit<T, K extends keyof T> = Partial<T> & Omit<T, K>;
