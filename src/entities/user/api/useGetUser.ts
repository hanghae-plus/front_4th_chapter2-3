import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../shared/config/QueryKeys"
import { UserDetail } from "../model/types"

export const useGetUser = (userId: number | null) => {
  return useQuery<UserDetail>({
    queryKey: userId !== null ? QUERY_KEYS.USER.getUser(userId.toString()) : [],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) {
        throw new Error("사용자 정보 가져오기 오류")
      }
      const userData = await response.json()
      return userData
    },
    enabled: userId !== null,
  })
}
