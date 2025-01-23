import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../shared/config/QueryKeys"
import { Comment } from "../model/types"

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedComment: Comment) => {
      const response = await fetch(`/api/comments/${updatedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: updatedComment.body }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENT.getCommentList(data.postId),
      })
    },
    onError: (error) => {
      console.error("댓글 업데이트 오류:", error)
    },
  })
}
