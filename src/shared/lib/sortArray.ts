export const sortArray = (array: any[], sortBy: string, order: string) => {
  const clone = [...array];

  const sorted = clone.sort((a, b) => {
    if (a[sortBy] === b[sortBy]) return 0;

    if (order === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }

    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  return sorted;
};
