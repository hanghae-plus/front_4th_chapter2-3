import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../shared/config/QueryKeys"
import { Comment } from "../model/types"
import { Post } from "../../post/model/types"

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: { id: Comment["id"]; postId: Post["id"] }) => {
      const response = await fetch(`/api/comments/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: 1 }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      return response.json()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENT.getCommentList(variables.postId),
      })
    },
    onError: (error) => {
      console.error("댓글 좋아요 오류:", error)
    },
  })
}
