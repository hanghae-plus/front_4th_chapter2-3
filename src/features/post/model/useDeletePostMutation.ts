import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "@entities/post/api"
import { postKeys } from "@entities/post/lib"

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postKeys.fetch._def,
        exact: true,
      })
    },
  })
}
