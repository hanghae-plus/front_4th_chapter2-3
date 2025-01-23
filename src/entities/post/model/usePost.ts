import { useAddPostQuery, useUpdatePostQuery, useDeletePostQuery } from "../api";

export const usePost = () => {
  const addPostMutation = useAddPostQuery();
  const updatePostMutation = useUpdatePostQuery();
  const deletePostMutation = useDeletePostQuery();

  return {
    addPost: addPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
  };
};
