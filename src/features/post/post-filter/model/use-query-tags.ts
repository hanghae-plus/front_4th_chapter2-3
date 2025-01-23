import { fetchTags, Tag, tagKeys } from "@/entities/tags"
import { useQuery } from "@tanstack/react-query"

function useQueryTags() {
  const { data, isLoading } = useQuery<Tag[]>({
    queryKey: tagKeys.all,
    queryFn: fetchTags,
  })

  return { data, isLoading }
}

export { useQueryTags }
