import { useQuery } from "@tanstack/react-query"
import { CommentResponse } from "../model/types"
import { QUERY_KEYS } from "../../../shared/config/QueryKeys"

export const useGetPostComments = (postId: number) => {
  return useQuery<Omit<CommentResponse, "skip" | "limit">>({
    queryKey: QUERY_KEYS.COMMENT.getCommentList(postId),
    queryFn: async () => {
      const response = await fetch(`/api/comments/post/${postId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch comments")
      }

      const data: CommentResponse = await response.json()

      return {
        comments: data.comments || [],
        total: data.total,
      }
    },
    enabled: !!postId,
  })
}
