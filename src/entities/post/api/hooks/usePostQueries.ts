import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Post, postApi } from "../postApi"

export const postQueryKeys = {
  all: "posts",
  lists: () => [postQueryKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number }) => [postQueryKeys.lists(), filters] as const,
  search: (query: string) => [postQueryKeys.all, "search", query] as const,
  tags: (tag: string) => [postQueryKeys.all, "tag", tag] as const,
}

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

interface MutationOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const useCreatePost = (options: MutationOptions = {}) => {
  const { onSuccess, onError } = options
  const queryClient = useQueryClient()
  const queryKey = postQueryKeys.lists()

  return useMutation({
    mutationFn: postApi.createPost,
    onMutate: async (newPost) => {
      const previousPosts = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: Post[] = []) => {
        const optimisticPost = {
          ...newPost,
          id: Date.now(),
          tags: [],
          reactions: { likes: 0, dislikes: 0 },
          views: 0,
        }
        return [...old, optimisticPost]
      })

      return { previousPosts }
    },
    onSuccess,
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousPosts)
      onError?.(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
  })
}

export const useUpdatePost = (options: MutationOptions = {}) => {
  const { onSuccess, onError } = options
  const queryClient = useQueryClient()
  const queryKey = postQueryKeys.lists()

  return useMutation({
    mutationFn: postApi.updatePost,
    onMutate: async (updatedPost) => {
      const previousPosts = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: Post[] = []) => {
        return old.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      })

      return { previousPosts }
    },
    onSuccess,
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousPosts)
      onError?.(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
  })
}

export const useDeletePost = (options: MutationOptions = {}) => {
  const { onSuccess, onError } = options
  const queryClient = useQueryClient()
  const queryKey = postQueryKeys.lists()

  return useMutation({
    mutationFn: postApi.deletePost,
    onMutate: async (postId) => {
      const previousPosts = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: Post[] = []) => {
        return old.filter((post) => post.id !== postId)
      })

      return { previousPosts }
    },
    onSuccess,
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousPosts)
      onError?.(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
  })
}
