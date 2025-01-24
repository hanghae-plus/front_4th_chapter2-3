import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCommentStore } from "./store"
import { commentApi } from "../api/api"

export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (postId: number) => [...commentKeys.lists(), postId] as const,
  detail: (id: number) => [...commentKeys.all, "detail", id] as const,
}

export const useCommentActions = () => {
  const { setComments, selectedComment, setSelectedComment, newComment, setNewComment } = useCommentStore()
  const queryClient = useQueryClient()

  const { isLoading } = useQuery({
    queryKey: commentKeys.list(newComment?.postId || 0),
    queryFn: () => commentApi.getComments(newComment?.postId || 0),
    enabled: !!newComment?.postId,
    onSuccess: (data) => {
      if (newComment?.postId) {
        setComments((prev) => ({
          ...prev,
          [newComment.postId]: data.comments,
        }))
      }
    },
  })

  // Add a new comment
  const { mutate: addComment } = useMutation({
    mutationFn: () => commentApi.addComment(newComment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(data.postId) })
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setNewComment({ body: "", postId: null, userId: 1 }) // Reset newComment
    },
  })

  // Update an existing comment
  const { mutate: updateComment } = useMutation({
    mutationFn: () => {
      if (!selectedComment?.id) return Promise.reject("No comment selected")
      return commentApi.updateComment(selectedComment.id, { body: selectedComment.body })
    },
    onSuccess: (data) => {
      if (!data) return
      queryClient.invalidateQueries({ queryKey: commentKeys.list(data.postId) })
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setSelectedComment(null)
    },
  })

  // Delete a comment
  const { mutate: deleteComment } = useMutation({
    mutationFn: ({ id, postId }: { id: number; postId: number }) => commentApi.deleteComment(id),
    onSuccess: (_, { id, postId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    },
  })

  // Like a comment
  const { mutate: likeComment } = useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => commentApi.updateComment(id, { likes }),
    onSuccess: (data) => {
      if (!data) return
      queryClient.invalidateQueries({ queryKey: commentKeys.list(data.postId) })
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: data.likes || 0 } : comment,
        ),
      }))
    },
  })

  return {
    isLoading,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    setSelectedComment,
    setNewComment,
    selectedComment,
    newComment,
  }
}
