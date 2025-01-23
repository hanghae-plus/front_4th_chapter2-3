import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post } from "@entities/post/types"
import { updatePost } from "@entities/post/api"

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newPost: Post) => updatePost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/posts"],
        exact: true,
      })
    },
  })
}
