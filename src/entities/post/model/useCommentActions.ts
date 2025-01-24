import { useCallback } from "react";
import { useStore } from "../../../app/providers/provider";
import { commentApi } from "../../comment/api/commentApi";

export const useCommentActions = () => {
  const { state, dispatch } = useStore();

  const fetchComments = useCallback(async (postId: number) => {
    if (state.comments.byPostId[postId]) return; // 이미 로드된 경우 스킵

    dispatch({ type: "SET_COMMENTS_LOADING", payload: true });
    try {
      const response = await commentApi.getCommentsByPostId(postId);
      dispatch({
        type: "SET_COMMENTS",
        payload: {
          postId,
          comments: response.comments
        }
      });
    } catch (error) {
      dispatch({
        type: "SET_COMMENTS_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch comments"
      });
    } finally {
      dispatch({ type: "SET_COMMENTS_LOADING", payload: false });
    }
  }, [dispatch, state.comments.byPostId]);

  const getPostComments = useCallback((postId: number) => {
    return state.comments.byPostId[postId] || [];
  }, [state.comments.byPostId]);

  return {
    comments: state.comments.byPostId,
    loading: state.comments.loading,
    error: state.comments.error,
    fetchComments,
    getPostComments
  };
};