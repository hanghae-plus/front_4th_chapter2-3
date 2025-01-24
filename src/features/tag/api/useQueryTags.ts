import { fetchTags } from "@/entities/tag/api"
import { useQuery } from "@tanstack/react-query"

export const useQueryTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
  })
}
