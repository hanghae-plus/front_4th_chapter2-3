import { queryOptions } from "@tanstack/react-query"

import { FetchPostsParams, Post } from "../model/types"
import { postApi } from "."
import { queryClient } from "../../../shared/api/query-client"

export const postQueries = {
  all: () => ["posts"] as const,
  list: () => [...postQueries.all(), "list"] as const,
  listByTag: () => [...postQueries.all(), "byTag"] as const,
  listQuery: (params: FetchPostsParams & { tag?: string }) =>
    queryOptions({
      queryKey: params.tag ? [...postQueries.tag(), params.tag, params] : [...postQueries.list(), params],
      queryFn: async () => {
        if (params.tag) {
          const response = await postApi.fetchPostsByTag({ tag: params.tag, ...params })
          return { data: response }
        }
        return postApi.fetchPosts(params)
      },
    }),
  search: () => [...postQueries.all(), "search"] as const,
  searchQuery: (query: string) =>
    queryOptions({
      queryKey: [...postQueries.search(), query],
      queryFn: () => postApi.searchPosts(query),
      enabled: query.length > 0,
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
    mutationFn: (post: Omit<Post, "id">) => postApi.addPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.list(),
      })
    },
  }),

  updateMutation: () => ({
    mutationKey: [...postQueries.all(), "update"] as const,
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) => postApi.updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.list(),
      })
    },
  }),

  deleteMutation: () => ({
    mutationKey: [...postQueries.all(), "delete"] as const,
    mutationFn: (id: number) => postApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueries.list(),
      })
    },
  }),
}
