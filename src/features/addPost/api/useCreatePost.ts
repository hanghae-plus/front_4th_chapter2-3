import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postApi, PostsTypes } from "../../../entities/post/api/postApi"
import { postQueryKeys } from "../../../entities/post/api/postQueryKeys"
import { optimisticAddPost } from "../../../entities/post/lib/transforms"

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const queryKey = postQueryKeys.lists()

  return useMutation({
    mutationFn: postApi.createPost,
    onMutate: async (newPost) => {
      const previousPosts = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: PostsTypes["posts"] = []) => {
        return optimisticAddPost(old, newPost)
      })

      return { previousPosts }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousPosts)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}
