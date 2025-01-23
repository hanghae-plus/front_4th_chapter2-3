import type { User } from "../model/types/user"

export const fetchUser = async (id: number): Promise<User | undefined> => {
  try {
    const response = await fetch(`/api/users/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
