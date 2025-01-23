export const calculatePrevSkip = (currentSkip: number, limit: number): number => {
  return Math.max(0, currentSkip - limit);
};

export const calculateNextSkip = (currentSkip: number, limit: number): number => {
  return currentSkip + limit;
};

export const isFirstPage = (skip: number): boolean => {
  return skip === 0;
};

export const isLastPage = (skip: number, limit: number, total: number): boolean => {
  return skip + limit >= total;
};
