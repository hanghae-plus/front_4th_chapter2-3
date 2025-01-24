export const postQueryKeys = {
  all: "posts",
  lists: () => [postQueryKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number }) => [postQueryKeys.lists(), filters] as const,
  search: (query: string) => [postQueryKeys.all, "search", query] as const,
  tags: (tag: string) => [postQueryKeys.all, "tag", tag] as const,
}
