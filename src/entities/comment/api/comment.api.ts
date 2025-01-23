import { useQuery } from "@tanstack/react-query"

import type { CommentsResponse } from "@entities/comment/model"

export const useCommentsQuery = (postId: number) =>
  useQuery<CommentsResponse>({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/comments/post/${postId}`)
        return await response.json()
      } catch (error) {
        throw new Error(`댓글 가져오기 오류: ${error}`)
      }
    },
  })
