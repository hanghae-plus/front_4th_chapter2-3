import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post } from "../../../entities/post/model/types"
import { apiClient } from "../../../app/api/apiClient"

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: { limit: number; skip: number }) => [...postKeys.lists(), filters] as const,
  search: (query: string) => [...postKeys.all, "search", query] as const,
  detail: (id: number) => [...postKeys.all, "detail", id] as const,
}

export const usePostMutations = () => {
  const queryClient = useQueryClient()

  const addPostMutation = useMutation({
    mutationFn: (post: Post) => apiClient.post<Post>("/posts/add", post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error)
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: (post: Post) => apiClient.put<Post>(`/posts/${post.id}`, post),
    onSuccess: (_, post) => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(post.id),
      })
    },
    onError: (error) => {
      console.error("게시물 수정 오류:", error)
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })

  return {
    addPostMutation,
    updatePostMutation,
    deletePostMutation,
  }
}
