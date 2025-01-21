import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateCommentDto } from "../../../entities/comment/model/types"
import { CommentApi } from "../../../entities/comment/api/CommentApi"

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: CreateCommentDto) => CommentApi.createComment(comment),
    onSuccess: (newComment, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      })
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: CommentApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      })
    },
  })
}
