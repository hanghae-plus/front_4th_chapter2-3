import { createQueryKeys } from "@lukemorales/query-key-factory";

export const postsKeys = createQueryKeys("posts", {
  getPosts: (limit: number, skip: number) => ["all", limit, skip],
  getPostsByQuery: (searchQuery: string) => [searchQuery],
  getPostsByTag: (tag: string) => [tag],
  getTags: () => ["tags"],
});
