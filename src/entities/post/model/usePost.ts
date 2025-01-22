import { fetchPosts } from "../api/fetchPosts.ts";
import { useCallback, useState } from "react";
import { usePostStore } from "@core/store/usePostStore.ts";
import { createPost } from "../api/createPost.ts";
import { NewPost, Post } from "@/types/post.ts";

export const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();

  const initializePosts = async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = async (newPost: NewPost) => {
    setIsLoading(true);
    try {
      const createdPost = await createPost(newPost);
      setPosts([createdPost, ...posts]);
      return createdPost;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePosts = useCallback(
    (updateFn: (currentPosts: Post[]) => Post[]) => {
      const updatedPosts = updateFn(posts);
      setPosts(updatedPosts);
    },
    [posts],
  );

  return {
    isLoading,
    initializePosts,
    addPost,
    updatePosts,
  };
};
