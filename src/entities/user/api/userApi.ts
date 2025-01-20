import { baseApi } from "../../../shared/api/baseApi";
import { User } from "../../types";

interface UsersResponse {
  users: User[];
  total: number;
}

export const userApi = {
  // 사용자 조회
  getUsers: (params?: { limit?: number; select?: string }) =>
    baseApi.get<UsersResponse>(
      `/api/users?${new URLSearchParams({
        limit: (params?.limit || 0).toString(),
        select: params?.select || "",
      }).toString()}`
    ),

  getUserById: (id: number) =>
    baseApi.get<User>(`/api/users/${id}`),

  // 사용자 생성/수정/삭제 (필요한 경우)
  createUser: (user: Omit<User, "id">) =>
    baseApi.post<User>("/api/users", user),

  updateUser: (id: number, user: Partial<User>) =>
    baseApi.put<User>(`/api/users/${id}`, user),

  deleteUser: (id: number) =>
    baseApi.delete(`/api/users/${id}`),
};