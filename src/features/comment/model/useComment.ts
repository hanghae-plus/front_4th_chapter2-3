import {
  useAddCommentQuery,
  useDeleteCommentQuery,
  useFetchPostCommentsQuery,
  useLikeCommentQuery,
  useUpdateCommentQuery,
} from "@entities/comment/api";
import { AddCommentRequest, Comment } from "@/types/comment.ts";

export const useComment = (postId: number) => {
  const { data: commentResponse, isLoading } = useFetchPostCommentsQuery(postId);
  const addCommentMutation = useAddCommentQuery();
  const updateCommentMutation = useUpdateCommentQuery();
  const deleteCommentMutation = useDeleteCommentQuery();
  const likeCommentMutation = useLikeCommentQuery();

  const addComment = (request: AddCommentRequest, onComplete: () => void) => {
    addCommentMutation.mutate(request, {
      onSuccess: () => onComplete(),
    });
  };

  const deleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  const likeComment = (commentId: number) => {
    likeCommentMutation.mutate(commentId);
  };

  const updateComment = (comment: Comment, onComplete: () => void) => {
    updateCommentMutation.mutate(comment, {
      onSuccess: () => onComplete(),
    });
  };

  return {
    comments: commentResponse?.comments ?? [],
    isLoading,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
  };
};
