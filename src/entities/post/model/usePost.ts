import { fetchPosts } from "../api/fetchPosts.ts";
import { useCallback, useEffect } from "react";
import { usePostStore } from "@core/store/usePostStore.ts";
import { createPost } from "../api/createPost.ts";
import { NewPost, Post } from "@/types/post.ts";
import { useQuery } from "@tanstack/react-query";

export const usePost = () => {
  const { posts, setPosts } = usePostStore();

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (query.data) {
      setPosts(query.data);
    }
  }, [query.data]);

  const addPost = async (newPost: NewPost) => {
    try {
      const createdPost = await createPost(newPost);
      setPosts([createdPost, ...posts]);
      return createdPost;
    } catch (error) {
      console.error(error);
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
    posts,
    isLoading: query.isLoading,
    addPost,
    updatePosts,
  };
};
