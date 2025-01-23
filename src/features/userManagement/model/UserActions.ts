import { userApi } from "../../../entities/user/api/userApi";
import { useUserContext } from "./UserContext";

export const useUserActions = () => {
  const { state, dispatch } = useUserContext();

  const fetchUsers = async (params?: { limit?: number; select?: string }) => {
    // 기존 state 사용 예시
    const currentUserCount = state.users.length;

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await userApi.getUsers({
        limit: params?.limit || currentUserCount + 10, 
        select: params?.select
      });
      
      dispatch({ type: 'SET_USERS', payload: response.users });
      dispatch({ type: 'SET_TOTAL', payload: response.total });
    } catch (error) {
      console.error("사용자 불러오기 오류:", error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getUserById = async (id: number) => {
    try {
      // 이미 로드된 사용자인지 확인
      const existingUser = state.users.find(user => user.id === id);
      if (existingUser) {
        dispatch({ type: 'SET_SELECTED_USER', payload: existingUser });
        return existingUser;
      }

      const user = await userApi.getUserById(id);
      dispatch({ type: 'SET_SELECTED_USER', payload: user });
      return user;
    } catch (error) {
      console.error("사용자 상세 정보 불러오기 오류:", error);
    }
  };

  return {
    fetchUsers,
    getUserById
  };
};