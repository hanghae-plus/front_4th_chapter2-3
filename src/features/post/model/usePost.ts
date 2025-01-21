import { fetchPosts } from "../api/fetchPosts.ts";
import { useState } from "react";
import { usePostStore } from "./usePostStore.ts";
import { NewPost, Post } from "../../../types/post.ts";
import { createPost } from "../api/createPost.ts";
import { updatePostById } from "../api/updatePostById.ts";

export const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();

  const initializePosts = async () => {
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

  const updatePosts = async (postId: string | number, selectedPost: Partial<Post>) => {
    try {
      const updatedPost = await updatePostById(postId.toString(), selectedPost);

      setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  return {
    isLoading,
    initializePosts,
    addPost,
    updatePosts,
  };
};
