import { createQueryKeys } from "@lukemorales/query-key-factory";

export const postsKeys = createQueryKeys("posts", {
  getPosts: ({ limit, skip, searchQuery, tag }) => ["all", limit, skip, searchQuery, tag],
  getTags: () => ["tags"],
});
