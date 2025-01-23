import { useMutation, useQueryClient } from "@tanstack/react-query"
import { likeComment } from "@entities/comment/api"
import { commentKeys } from "@features/comment/lib"

export const useLikeCommentsMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: { likes: number } }) => likeComment(id, likes),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.fetch._def,
        exact: true,
      })
    },
  })
}
