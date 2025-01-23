import type { User } from "../model/types/user"

interface ResponseType {
  users: Pick<User, "id" | "username" | "image">[]
}

export const fetchUsernameAndImageOnly = async (): Promise<ResponseType | undefined> => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
