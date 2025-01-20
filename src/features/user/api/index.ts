import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../../entities/user/api"

const queryKeys = {
  all: ["user"] as const,
}

//사용자 조회
export const useGetUsers = (id: number) => {
  return useQuery({
    queryKey: [...queryKeys.all, id],
    queryFn: () => getUsers(id),
    enabled: !!id,
  })
}
