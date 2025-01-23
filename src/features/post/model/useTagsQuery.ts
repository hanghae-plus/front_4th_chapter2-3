import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "@entities/post/api"

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["/api/posts/tags"],
    queryFn: () => fetchTags(),
  })
}
