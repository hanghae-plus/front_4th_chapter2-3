import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../shared/config/QueryKeys"
import { Comment } from "../model/types"
import { Post } from "../../post/model/types"

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: { id: Comment["id"]; postId: Post["id"] }) => {
      const response = await fetch(`/api/comments/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      return params.postId
    },
    onSuccess: (postId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENT.getCommentList(postId),
      })
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error)
    },
  })
}
