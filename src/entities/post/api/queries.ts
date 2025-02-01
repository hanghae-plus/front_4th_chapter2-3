import { queryOptions } from "@tanstack/react-query"

import { FetchPostsBySearchParams, FetchPostsByTagParams, FetchPostsParams } from "../model"
import { postApi } from "./api"

export const postQueries = {
  all: () => ["posts"] as const,
  list: () => [...postQueries.all(), "list"] as const,
  listQuery: (params: FetchPostsParams) =>
    queryOptions({
      queryKey: [...postQueries.list(), params],
      queryFn: () => postApi.fetchPosts(params),
    }),

  listByTag: () => [...postQueries.list(), "byTag"] as const,
  listByTagQuery: (params: FetchPostsByTagParams) =>
    queryOptions({
      queryKey: [...postQueries.listByTag(), params],
      queryFn: () => postApi.fetchPostsByTag(params),
      enabled: !!params.tag,
    }),

  search: () => [...postQueries.list(), "search"] as const,
  searchQuery: (params: FetchPostsBySearchParams) =>
    queryOptions({
      queryKey: [...postQueries.search(), params],
      queryFn: () => postApi.searchPosts(params),
      enabled: !!params.search,
    }),

  detail: () => [...postQueries.all(), "detail"] as const,
  detailQuery: (id: string) =>
    queryOptions({
      queryKey: [...postQueries.detail(), id],
      queryFn: () => postApi.fetchPost(id),
      enabled: !!id,
    }),

  tag: () => [...postQueries.all(), "tag"] as const,
  tagQuery: () =>
    queryOptions({
      queryKey: [...postQueries.all(), "tag"],
      queryFn: postApi.fetchTags,
    }),
}
