import axios from "axios"
import { User } from "../model/types"

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const { data } = await axios.get("/api/users?limit=0&select=username,image")
    return data
  },

  getUserById: async (id: number): Promise<User> => {
    const { data } = await axios.get(`/api/users/${id}`)
    return data
  },
}
