import { useAddPostQuery, useUpdatePostQuery, useDeletePostQuery } from "../api";
import { NewPost, UpdatePostRequest } from "@/types/post.ts";

export const usePost = () => {
  const addPostMutation = useAddPostQuery();
  const updatePostMutation = useUpdatePostQuery();
  const deletePostMutation = useDeletePostQuery();

  const addPost = (newPost: NewPost, onComplete?: () => void) => {
    addPostMutation.mutate(newPost, {
      onSuccess: () => {
        onComplete?.();
      },
    });
  };

  const deletePost = (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  const updatePost = (request: UpdatePostRequest, onComplete?: () => void) => {
    updatePostMutation.mutate(request, {
      onSuccess: () => {
        onComplete?.();
      },
    });
  };

  return {
    addPost,
    updatePost,
    deletePost,
  };
};
