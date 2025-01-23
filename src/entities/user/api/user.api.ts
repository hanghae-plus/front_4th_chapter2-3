import { useQuery } from "@tanstack/react-query"
import type { UseQueryOptions } from "@tanstack/react-query"
import type { UserType, UserResponse, UsersResponse } from "../model"

export const useUserQuery = (
  id: UserType["id"],
  options?: Omit<UseQueryOptions<UserResponse>, "queryKey" | "queryFn">,
) =>
  useQuery<UserResponse>({
    queryKey: ["user", id],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/users/${id}`)
        return await response.json()
      } catch (error) {
        throw new Error(`유저 가져오기 오류: ${error}`)
      }
    },
    ...options,
  })

export const useUsersQuery = (options?: Omit<UseQueryOptions<UsersResponse>, "queryKey" | "queryFn">) =>
  useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/users?limit=0&select=username,image")
        return await response.json()
      } catch (error) {
        throw new Error(`유저 가져오기 오류: ${error}`)
      }
    },
    ...options,
  })
