export const pop = <T>(array: T[]) => {
  return array.slice(0, array.length - 1);
};

export const push = <T>(array: T[], element: T) => {
  return array.concat(element);
};
