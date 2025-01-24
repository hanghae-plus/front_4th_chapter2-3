import {
  useAddCommentQuery,
  useDeleteCommentQuery,
  useFetchPostCommentsQuery,
  useLikeCommentQuery,
  useUpdateCommentQuery,
} from "@entities/comment/api";
import { usePostStore } from "@core/store/usePostStore.ts";

export const useComment = (postId: string) => {
  const { data: commentResponse, isLoading } = useFetchPostCommentsQuery(postId);
  const { posts, setPosts } = usePostStore();
  const addCommentMutation = useAddCommentQuery();
  const updateCommentMutation = useUpdateCommentQuery();
  const deleteCommentMutation = useDeleteCommentQuery();
  const likeCommentMutation = useLikeCommentQuery();

  const addComment = (comment: Partial<Comment>, onComplete?: () => void) => {
    addCommentMutation.mutate(
      { ...comment, postId },
      {
        onSuccess: () => onComplete?.(),
      },
    );
  };

  const updateComment = (comment: Comment, onComplete?: () => void) => {
    updateCommentMutation.mutate(comment, {
      onSuccess: () => onComplete?.(),
    });
  };

  const deleteComment = (commentId: string) => {
    deleteCommentMutation.mutate(commentId);
  };

  const likeComment = (commentId: string) => {
    likeCommentMutation.mutate(commentId);
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
