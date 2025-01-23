import axios, { AxiosResponse } from "axios"
import { User } from "../model/type"

export const getUsers = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/users?limit=0&select=username,image`)
  return response.data.json()
}

export const getUserById = async (user: User): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/users/${user.id}`)
  return response.data.json()
}
