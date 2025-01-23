import { getUser } from "@/entities/user"
import { userDetailKeys } from "@/entities/user/api/query-keys"
import { User } from "@/entities/user/model/types"
import { useQuery } from "@tanstack/react-query"

interface UseQueryUserDetailProps {
  userId?: number
  enabled: boolean
}

function useQueryUserDetail(props: UseQueryUserDetailProps) {
  const { userId, enabled } = props

  const { data: userData, isLoading } = useQuery<User>({
    queryKey: userDetailKeys.detail(userId),
    queryFn: () => {
      if (!userId) throw new Error("user_id가 필요합니다.")
      return getUser(userId)
    },
    enabled,
  })

  return {
    userData,
    isLoading,
  }
}

export { useQueryUserDetail }
