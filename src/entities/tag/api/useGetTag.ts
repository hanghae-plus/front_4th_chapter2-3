import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../shared/config/QueryKeys"
import { Tag } from "../model/types"

export const useGetTags = () => {
  return useQuery<Tag[]>({
    queryKey: QUERY_KEYS.TAG,
    queryFn: async () => {
      const response = await fetch("/api/posts/tags")
      if (!response.ok) {
        throw new Error("태그 가져오기 오류")
      }
      return response.json()
    },
  })
}
