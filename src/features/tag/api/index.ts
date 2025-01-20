import { useQuery } from "@tanstack/react-query"
import { getPostsByTag, getTags } from "../../../entities/tag/api"

const queryKeys = {
  all: ["tag"] as const,
  search: () => [...queryKeys.all, "search"] as const,
}

//태그 조회
export const useGetTags = () => {
  return useQuery({
    queryKey: [...queryKeys.all],
    queryFn: () => getTags(),
  })
}

//태그로 게시물 조회
export const useGetPostsByTag = (tag: string) => {
  return useQuery({
    queryKey: [...queryKeys.search(), tag],
    queryFn: () => getPostsByTag(tag),
    enabled: tag !== "all",
  })
}
