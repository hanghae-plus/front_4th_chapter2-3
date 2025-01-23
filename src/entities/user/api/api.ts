import { httpClient } from "../../../shared/api"
import { User } from "../model"

export const userApi = {
  fetchUsers: async () => {
    const response = await httpClient.get<{ users: User[] }>(`/users?limit=0&select=username,image`)
    return response.data
  },

  fetchUserById: async (id: number) => {
    const response = await httpClient.get<User>(`/users/${id}`)
    return response.data
  },
}
