import { queryOptions } from "@tanstack/react-query"

import { CreatePostDto, FetchPostsBySearchParams, FetchPostsByTagParams, FetchPostsParams, Post } from "../model/types"
import { postApi } from "."
import { queryClient } from "../../../shared/api/query-client"

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

export const postMutations = {
  addMutation: () => ({
    mutationKey: [...postQueries.all(), "add"] as const,
    mutationFn: (post: CreatePostDto) => postApi.addPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      })
    },
  }),

  updateMutation: () => ({
    mutationKey: [...postQueries.all(), "update"] as const,
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) => postApi.updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      })
    },
  }),

  deleteMutation: () => ({
    mutationKey: [...postQueries.all(), "delete"] as const,
    mutationFn: (id: number) => postApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.all(),
      })
    },
  }),
}
