import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "@entities/comment/api"

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/comments/posts"],
        exact: true,
      })
    },
  })
}
