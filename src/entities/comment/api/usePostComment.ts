import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment } from "../model/types"
import { QUERY_KEYS } from "@shared/config/QueryKeys"

export const usePostComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newComment: Partial<Comment>) => {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENT.getCommentList(data.postId.toString()),
      })
    },
    onError: (error) => {
      console.error("댓글 추가 오류:", error)
    },
  })
}
