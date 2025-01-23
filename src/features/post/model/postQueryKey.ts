import { PostsRequestDto } from "@entities/post";
import { QUERY_KEY } from "@features/shared";

export const postQueryKey = {
  base: [QUERY_KEY.POST] as const,
  list: (param: PostsRequestDto) => [postQueryKey.base, "list", param],
  listBySearch: (searchQuery: string) => [postQueryKey.base, "search", searchQuery],
  listByTag: (tag: string) => [postQueryKey.base, "listByTag", tag],
};
