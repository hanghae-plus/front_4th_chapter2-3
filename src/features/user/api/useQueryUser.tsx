import { fetchUser } from "@/entities/user/api"
import { UserId } from "@/entities/user/model"
import { useQuery } from "@tanstack/react-query"

export const useQueryUser = (userId: UserId) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  })
}
