import { useAddPostQuery, useUpdatePostQuery, useDeletePostQuery } from "../api";
import { usePostStore } from "@core/store/usePostStore.ts";
import { Post } from "@/types/post.ts";

export const usePost = () => {
  const { posts, setPosts } = usePostStore();
  const addPostMutation = useAddPostQuery();
  const updatePostMutation = useUpdatePostQuery();
  const deletePostMutation = useDeletePostQuery();

  const handleAddPost = (newPost: Partial<Post>, onComplete?: () => void) => {
    console.log("addPost");
    addPostMutation.mutate(newPost, {
      onSuccess: (data) => {
        console.log(`addPost2 : ${data}`);
        setPosts([data, ...posts]);
        onComplete?.();
      },
    });
  };

  const handleDeletePost = (postId: number) => {
    deletePostMutation.mutate(postId, {
      onSuccess: () => {
        setPosts([...posts].filter((post) => post.id !== postId));
      },
    });
  };

  return {
    handleAddPost,
    updatePost: updatePostMutation,
    handleDeletePost,
  };
};
