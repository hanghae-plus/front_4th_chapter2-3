import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "@entities/comment/api"
import { commentKeys } from "@features/comment/lib"

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.fetch._def,
        exact: true,
      })
    },
  })
}
