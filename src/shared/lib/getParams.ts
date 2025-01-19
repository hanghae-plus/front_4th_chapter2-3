export type SortBy = "id" | "title" | "reactions" | "";
export type SortOrder = "asc" | "dsc" | "";

interface ParamProps {
  skip: number;
  limit: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  selectedTag: string;
}

export const getParams = ({ skip, limit, searchQuery, sortBy, sortOrder, selectedTag }: ParamProps) => {
  const params = new URLSearchParams();

  if (skip) params.set("skip", skip.toString());
  if (limit) params.set("limit", limit.toString());
  if (searchQuery) params.set("search", searchQuery);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("sortOrder", sortOrder);
  if (selectedTag) params.set("tag", selectedTag);

  return params;
};
