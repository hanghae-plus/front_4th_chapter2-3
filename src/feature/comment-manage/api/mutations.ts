import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateCommentDto } from "../../../entities/comment/model/types"
import { CommentApi } from "../../../entities/comment/api/CommentApi"
import { QUERY_KEYS } from "../../../entities/comment/model/constants"

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: CreateCommentDto) => CommentApi.createComment(comment),
    onSuccess: (newComment, variables) => {
      queryClient.setQueryData(QUERY_KEYS.comments.byPostId(variables.postId), (oldComments: Comment[] = []) => [
        ...oldComments,
        newComment,
      ])
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: CommentApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comments.all,
      })
    },
  })
}
