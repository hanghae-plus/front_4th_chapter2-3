import { useQuery } from "@tanstack/react-query"
import { userApi } from "../../../entities/user/api/userApi"

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userApi.getUsers(),
  })
}

export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => userApi.getUserById(userId),
    enabled: !!userId,
  })
}
