import { UsersAPI } from '../api/user.api'

export const getUserList = async () => {
  const response = await UsersAPI.getList()
  const data = await response.json()
  return data
}

export const getUser = async (id: number) => {
  const response = await UsersAPI.getById(id)
  const data = await response.json()
  return data
}
