import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postQueryKeys } from "./postQueryKeys"
import { postApi, PostsTypes } from "../postApi"

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const queryKey = postQueryKeys.lists()

  return useMutation({
    mutationFn: postApi.createPost,
    onMutate: async () => {
      const previousPosts = queryClient.getQueryData(queryKey)
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

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  const queryKey = postQueryKeys.lists()

  return useMutation({
    mutationFn: postApi.updatePost,
    onMutate: async (updatedPost) => {
      const previousPosts = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: PostsTypes["posts"] = []) => {
        return old.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      })

      return { previousPosts }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousPosts)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const queryKey = postQueryKeys.lists()

  return useMutation({
    mutationFn: postApi.deletePost,
    onMutate: async (postId) => {
      const previousPosts = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: PostsTypes["posts"] = []) => {
        return old.filter((post) => post.id !== postId)
      })

      return { previousPosts }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousPosts)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
  })
}
