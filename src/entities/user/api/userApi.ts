import { TUser } from "../model/types"

export const getUserById = async (userId: number): Promise<TUser> => {
  const response = await fetch(`/api/users/${userId}`)
  return response.json()
}
