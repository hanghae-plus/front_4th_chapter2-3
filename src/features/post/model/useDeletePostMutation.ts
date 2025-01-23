import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "@entities/post/api"

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/posts"],
        exact: true,
      })
    },
  })
}
