import { useQuery } from "@tanstack/react-query"
import { userApi } from "../userApi"
import { userQueryKeys } from "../userQueryKeys"

export const useGetUsers = (limit: number, select: string[]) => {
  return useQuery({
    queryKey: userQueryKeys.lists(),
    queryFn: () => userApi.getUsers(limit, select),
  })
}
