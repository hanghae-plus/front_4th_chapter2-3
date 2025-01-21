import { useCallback } from "react";
import { useStore } from "../../../app/providers/provider";
import { PostFilters, PaginationParams } from "../../types";
import { postApi } from "../api/postApi";
import { selectPostById } from "./selectors";

export const usePostActions = () => {
  const { state, dispatch } = useStore();

  const fetchPosts = useCallback(async (params: PostFilters & PaginationParams) => {
    dispatch({ type: "SET_POSTS_LOADING", payload: true });
    try {
      const response = await postApi.getPosts(params);
      dispatch({
        type: "SET_POSTS",
        payload: {
          items: response.posts,
          total: response.total
        }
      });
    } catch (error) {
      dispatch({
        type: "SET_POSTS_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch posts"
      });
    } finally {
      dispatch({ type: "SET_POSTS_LOADING", payload: false });
    }
  }, [dispatch]);

  const getPostById = useCallback(async (id: number) => {
    const existingPost = selectPostById(state.posts.items, id);
    if (existingPost) return existingPost;

    try {
      return await postApi.getPostById(id);
    } catch (error) {
      console.error("Failed to fetch post:", error);
      return null;
    }
  }, [state.posts.items]);

  return {
    posts: state.posts.items,
    total: state.posts.total,
    loading: state.posts.loading,
    error: state.posts.error,
    fetchPosts,
    getPostById
  };
};