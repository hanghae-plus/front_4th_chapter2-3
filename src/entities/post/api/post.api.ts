import { useQuery } from "@tanstack/react-query"

import type { UseQueryOptions } from "@tanstack/react-query"
import { PostsResponse } from "@entities/post/model"

export const usePostsQuery = (
  { limit, skip }: { limit: number; skip: number },
  options?: Omit<UseQueryOptions<PostsResponse>, "queryKey" | "queryFn">,
) =>
  useQuery({
    queryKey: ["posts", limit, skip],
    queryFn: async () => {
      try {
        const response = await fetch(`api/posts?limit=${limit}&skip=${skip}`)
        return await response.json()
      } catch (error) {
        throw new Error(`게시물 가져오기 오류: ${error}`)
      }
    },
    ...options,
  })
