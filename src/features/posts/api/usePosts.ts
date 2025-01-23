import {
  addPost,
  deletePost,
  getPosts,
  getPostsBySearchQuery,
  getPostsByTag,
  updatePost,
} from "../../../entities/post/api/index"
import { useParamsStore } from "../../../app/model/params-store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Posts } from "../../../entities/post/model/type"

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
    mutationFn: deletePost, // 서버에서 데이터를 삭제하는 함수
    onMutate: async (postId) => {
      // 현재 쿼리의 캐시 업데이트 중단
      await queryClient.cancelQueries({ queryKey })

      // 이전 데이터를 스냅샷으로 저장
      const previousPosts = queryClient.getQueryData<Posts>(queryKey)

      // Optimistic Update
      if (previousPosts) {
        const newPosts = {
          ...previousPosts,
          posts: previousPosts.posts.filter((post) => post.id !== postId),
          total: previousPosts.total - 1,
        }
        queryClient.setQueryData(queryKey, newPosts)
      }

      // 스냅샷 반환 (rollback에 사용)
      return { previousPosts }
    },
  })

  const addPostMutation = useMutation({
    mutationFn: addPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey })
      const previousPosts = queryClient.getQueryData<Posts>(queryKey)
      if (previousPosts) {
        const newPosts = {
          ...previousPosts,
          posts: [newPost, ...previousPosts.posts],
          total: previousPosts.total + 1,
        }
        queryClient.setQueryData(queryKey, newPosts)
      }

      return { previousPosts }
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onMutate: async (selectedPost) => {
      await queryClient.cancelQueries({ queryKey })

      const previousPosts = queryClient.getQueryData<Posts>(queryKey)

      if (previousPosts) {
        const newPosts = {
          ...previousPosts,
          posts: previousPosts.posts.map((post) => (post.id === selectedPost.id ? { ...post, ...selectedPost } : post)),
        }
        queryClient.setQueryData(queryKey, newPosts)
      }

      return { previousPosts }
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
