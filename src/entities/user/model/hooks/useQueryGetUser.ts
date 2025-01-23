import { useQuery } from "@tanstack/react-query"

import { fetchUser } from "../../api/fetchUser"

import type { User } from "../types/user"

interface UseQueryGetUserParams {
  id: number
}

export const getUserQueryKeys = {
  all: ["fetchUser"],
  detail: (id: number) => ["fetchUser", { id }],
}

export const useQueryGetUser = ({ id }: UseQueryGetUserParams) => {
  return useQuery({
    queryKey: getUserQueryKeys.detail(id),
    queryFn: async () => fetcher(id),
  })
}

const fetcher = async (id: number): Promise<User | undefined> => {
  try {
    const data = await fetchUser(id)

    if (!data) return

    return data
  } catch (error) {
    console.error("유저 정보 가져오기 오류:", error)
  }
}
