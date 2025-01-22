import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addComment, deleteComment, getComments, likeComment, updateComment } from "../api/comment"

export const useComments = (postId: number) => {
  const queryClient = useQueryClient()
  const queryKey = ["comments", postId]
  const { data: comments, isLoading } = useQuery({ queryKey, queryFn: () => getComments(postId) })

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const likeCommentMutation = useMutation({
    mutationFn: likeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
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
