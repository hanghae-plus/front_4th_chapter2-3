import { UserResponse } from "../types"

export const fetchUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  const data: UserResponse = await response.json()
  return data.users
}
