import { useCallback } from "react";
import { useStore } from "../../../app/providers/provider";
import { userApi } from "../../user/api/userApi";

export const useUserActions = () => {
  const { state, dispatch } = useStore();

  const fetchUsers = useCallback(async (params?: { limit?: number; select?: string }) => {
    dispatch({ type: "SET_USERS_LOADING", payload: true });
    try {
      const response = await userApi.getUsers(params);
      dispatch({
        type: "SET_USERS",
        payload: response.users
      });
    } catch (error) {
      dispatch({
        type: "SET_USERS_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch users"
      });
    } finally {
      dispatch({ type: "SET_USERS_LOADING", payload: false });
    }
  }, [dispatch]);

  const getUserById = useCallback((id: number) => {
    return state.users.items.find(user => user.id === id);
  }, [state.users.items]);

  return {
    users: state.users.items,
    loading: state.users.loading,
    error: state.users.error,
    fetchUsers,
    getUserById
  };
};