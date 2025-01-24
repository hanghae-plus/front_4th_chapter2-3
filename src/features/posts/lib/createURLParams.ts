export const createURLParams = (
  searchQuery: string,
  selectedTag: string,
  sortBy: string,
  sortOrder: string,
): string => {
  const params = new URLSearchParams();

  if (searchQuery) params.set("search", searchQuery);
  if (selectedTag !== "all") params.set("tag", selectedTag);
  if (sortBy !== "none") params.set("sort", sortBy);
  if (sortOrder !== "desc") params.set("order", sortOrder);

  return params.toString();
};
