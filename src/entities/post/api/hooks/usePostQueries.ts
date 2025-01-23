import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postApi, PostsTypes } from "../postApi"
import { postQueryKeys } from "../postQueryKeys"

export const useGetPosts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: postQueryKeys.list({ limit, skip }),
    queryFn: () => postApi.getPosts(limit, skip),
  })
}

export const useGetPostsBySearch = (searchQuery: string) => {
  return useQuery({
    queryKey: postQueryKeys.search(searchQuery),
    queryFn: () => postApi.getPostsBySearch(searchQuery),
  })
}

export const useGetPostsByTag = (tag: string) => {
  return useQuery({
    queryKey: postQueryKeys.tags(tag),
    queryFn: () => postApi.getPostsByTag(tag),
    enabled: !!tag,
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
