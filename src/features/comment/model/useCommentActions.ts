import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCommentStore } from "./store"
import { apiClient } from "../../../app/api/apiClient"

export const commentKeys = {
  all: ["comments"] as const,
  post: (postId: number) => [...commentKeys.all, "post", postId] as const,
  detail: (commentId: number) => [...commentKeys.all, "detail", commentId] as const,
}

export const useCommentActions = () => {
  const { comments, setComments, selectedComment, setSelectedComment, newComment, setNewComment } = useCommentStore()

  const queryClient = useQueryClient()

  const { isLoading: isCommentsLoading, data: commentsData } = useQuery({
    queryKey: commentKeys.post(selectedComment?.postId || 0),
    queryFn: () => apiClient.get(`/api/comments/post/${selectedComment?.postId || 0}`),
    enabled: !!selectedComment?.postId,
    onSuccess: (data: { postId: number }) => {
      setComments((prev) => ({ ...prev, [selectedComment?.postId || 0]: data.comments }))
    },
    onError: (error) => {
      console.error("Error fetching comments:", error)
    },
  })

  // Add comment mutation
  const { mutate: addCommentMutation } = useMutation({
    mutationFn: (comment: typeof newComment) => apiClient.post<{ postId: number }>("/api/comments/add", comment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.post(data.postId) })
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setNewComment({ body: "", postId: null, userId: 1 })
    },
    onError: (error) => {
      console.error("Error adding comment:", error)
    },
  })

  // Update comment mutation
  const { mutate: updateCommentMutation } = useMutation({
    mutationFn: (comment: typeof selectedComment) =>
      apiClient.put(`/api/comments/${comment?.id}`, { body: comment?.body }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.post(data.postId) })
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((c) => (c.id === data.id ? data : c)),
      }))
    },
    onError: (error) => {
      console.error("Error updating comment:", error)
    },
  })

  // Delete comment mutation
  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/api/comments/${id}`),
    onSuccess: (_, id) => {
      const postId = selectedComment?.postId
      if (postId) {
        queryClient.invalidateQueries({ queryKey: commentKeys.post(data.postId) })
        setComments((prev) => ({
          ...prev,
          [postId]: prev[postId].filter((comment) => comment.id !== id),
        }))
      }
    },
    onError: (error) => {
      console.error("Error deleting comment:", error)
    },
  })

  // Like comment mutation
  const { mutate: likeCommentMutation } = useMutation({
    mutationFn: (comment: { id: number; postId: number }) =>
      apiClient.patch(`/api/comments/${comment.id}`, {
        likes: (comments[comment.postId]?.find((c) => c.id === comment.id)?.likes || 0) + 1,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.post(variables.postId) })
      setComments((prev) => ({
        ...prev,
        [variables.postId]: prev[variables.postId].map((c) => (c.id === data.id ? { ...c, likes: data.likes } : c)),
      }))
    },
    onError: (error) => {
      console.error("Error liking comment:", error)
    },
  })

  return {
    comments,
    selectedComment,
    newComment,
    setSelectedComment,
    setNewComment,
    isLoading: { comments: isCommentsLoading },
    addComment: addCommentMutation,
    updateComment: updateCommentMutation,
    deleteComment: deleteCommentMutation,
    likeComment: likeCommentMutation,
  }
}
