import { apiClient } from "@/shared/api"
import { User, UserResponse } from "../model/types"

export const userApi = {
  /* --------------------------------
   * GET Requests
   * -------------------------------- */

  // 전체 사용자 정보 가져오기
  getUsers: async (params: { limit: number; select: string }) => {
    const response = await apiClient.get<UserResponse>("/users", { params })
    return response.data
  },

  // 사용자 정보 가져오기
  getUser: async (userId: number) => {
    const response = await apiClient.get<User>(`/users/${userId}`)
    return response.data
  },
}
