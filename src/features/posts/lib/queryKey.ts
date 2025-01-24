import { createQueryKeys } from "@lukemorales/query-key-factory";

import { GetPostsByQueryProps, GetPostsByTagProps, GetPostsProps } from "@/entities/posts";

export const postsKeys = createQueryKeys("posts", {
  getPosts: (props: GetPostsProps & GetPostsByQueryProps & GetPostsByTagProps) => [props],
  getTags: () => ["tags"],
});
