import { useAddPostQuery, useUpdatePostQuery, useDeletePostQuery } from "../api";
import { usePostStore } from "@core/store/usePostStore.ts";

export const usePost = () => {
  const { posts, setPosts } = usePostStore();
  const addPostMutation = useAddPostQuery();
  const updatePostMutation = useUpdatePostQuery();
  const deletePostMutation = useDeletePostQuery();

  const handleDeletePost = (postId: number) => {
    deletePostMutation.mutate(postId, {
      onSuccess: () => {
        setPosts([...posts].filter((post) => post.id !== postId));
      },
    });
  };

  return {
    addPost: addPostMutation,
    updatePost: updatePostMutation,
    handleDeletePost,
  };
};
