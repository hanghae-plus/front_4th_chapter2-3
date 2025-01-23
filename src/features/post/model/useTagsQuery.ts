import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "@entities/post/api"
import { postKeys } from "@entities/post/lib"

export const useTagsQuery = () => {
  return useQuery({
    queryKey: postKeys.tags().queryKey,
    queryFn: () => fetchTags(),
  })
}
