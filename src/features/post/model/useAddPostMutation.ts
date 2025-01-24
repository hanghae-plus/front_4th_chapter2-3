import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RequestPost } from "@entities/post/types"
import { addPost } from "@entities/post/api"
import { postKeys } from "@entities/post/lib"

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newPost: RequestPost) => addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postKeys.fetch._def,
        exact: true,
      })
    },
  })
}
