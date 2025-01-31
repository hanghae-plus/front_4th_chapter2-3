import { useQuery } from "@tanstack/react-query"
import { Post } from "../model/types"
import { QUERY_KEYS } from "@shared/config/QueryKeys"

export const useGetPostDetail = (postId: number | null) => {
  return useQuery<Post>({
    queryKey: QUERY_KEYS.POST.getPostDetail(postId?.toString()),
    queryFn: async () => {
      const response = await fetch(`/api/posts/${postId}`)
      const data = await response.json()
      return data
    },
    enabled: postId !== null,
  })
}
