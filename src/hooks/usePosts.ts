import { addPost, deletePost, getPosts, getPostsBySearchQuery, getPostsByTag, updatePost } from "../api/post"
import { useParamsStore } from "../store/params"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const usePosts = () => {
  const { selectedTag, skip, limit, sortBy, sortOrder, searchQuery } = useParamsStore()
  const queryClient = useQueryClient()
  const queryKey = ["posts", selectedTag, skip, limit, sortBy, sortOrder, searchQuery]
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      if (searchQuery) {
        const data = await getPostsBySearchQuery(searchQuery)
        return { posts: data.posts, total: data.total }
      }

      if (selectedTag && selectedTag !== "all") {
        const data = await getPostsByTag(selectedTag)
        return { posts: data.posts, total: data.total }
      }

      const data = await getPosts(limit, skip)
      return { posts: data.posts, total: data.total }
    },
  })

  // ! query와 mutation을 따로 관리하나?
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const addPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return {
    posts,
    deletePost: deletePostMutation.mutate,
    addPost: addPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    loading: isLoading,
    error,
  }
}
