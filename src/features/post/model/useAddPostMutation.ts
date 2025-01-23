import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RequestPost } from "@entities/post/types"
import { addPost } from "@entities/post/api"

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newPost: RequestPost) => addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/posts"],
        exact: true,
      })
    },
  })
}
