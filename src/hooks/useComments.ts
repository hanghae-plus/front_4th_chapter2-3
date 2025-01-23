import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addComment, deleteComment, getComments, likeComment, updateComment } from "../api/comment"
import { Comments } from "../types/comment"

export const useComments = (postId: number) => {
  const queryClient = useQueryClient()
  const queryKey = ["comments", postId]
  const { data: comments, isLoading } = useQuery({ queryKey, queryFn: () => getComments(postId) })

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey })
      const previousComments = queryClient.getQueryData<Comments>(queryKey)

      if (previousComments) {
        const newComments = {
          ...previousComments,
          comments: [newComment, ...previousComments.comments],
          total: previousComments.total + 1,
        }
        queryClient.setQueryData(queryKey, newComments)
      }

      return { previousComments }
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onMutate: async (selectedComment) => {
      await queryClient.cancelQueries({ queryKey })

      const previousComments = queryClient.getQueryData<Comments>(queryKey)

      if (previousComments) {
        const newComments = {
          ...previousComments,
          comments: previousComments.comments.map((comment) =>
            comment.id === selectedComment.id ? { ...comment, ...selectedComment } : comment,
          ),
        }
        queryClient.setQueryData(queryKey, newComments)
      }

      return { previousComments }
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey })

      const previousComments = queryClient.getQueryData<Comments>(queryKey)

      if (previousComments) {
        const newComments = {
          ...previousComments,
          comments: previousComments.comments.filter((comment) => comment.id !== commentId),
          total: previousComments.total - 1,
        }
        queryClient.setQueryData(queryKey, newComments)
      }

      return { previousComments }
    },
  })

  const likeCommentMutation = useMutation({
    mutationFn: likeComment,
    onMutate: async ({ id, likes }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousComments = queryClient.getQueryData<Comments>(queryKey)

      if (previousComments) {
        const newComments = {
          ...previousComments,
          comments: previousComments.comments.map((comment) =>
            comment.id === id ? { ...comment, likes: likes + 1 } : comment,
          ),
        }

        queryClient.setQueryData(queryKey, newComments)
      }

      return { previousComments }
    },
  })

  return {
    comments,
    loading: isLoading,
    addComment: addCommentMutation.mutate,
    updateComment: updateCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
    likeComment: likeCommentMutation.mutate,
  }
}
