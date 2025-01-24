import { apiClient } from "../../../shared/api/apiClient"
import { IUser } from "../model/types"

export const getUserById = async (userId: number): Promise<IUser> => {
  const response = await apiClient.get(`/api/users/${userId}`)

  return response.data
}
