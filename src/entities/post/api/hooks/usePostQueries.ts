import { useQuery } from "@tanstack/react-query"
import { postApi } from "../postApi"
import { postQueryKeys } from "../postQueryKeys"

export const useGetPosts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: postQueryKeys.list({ limit, skip }),
    queryFn: () => postApi.getPosts(limit, skip),
  })
}

export const useGetPostsBySearch = (searchQuery: string) => {
  return useQuery({
    queryKey: postQueryKeys.search(searchQuery),
    queryFn: () => postApi.getPostsBySearch(searchQuery),
  })
}

export const useGetPostsByTag = (tag: string) => {
  return useQuery({
    queryKey: postQueryKeys.tags(tag),
    queryFn: () => postApi.getPostsByTag(tag),
    enabled: !!tag,
  })
}
