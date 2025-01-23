import { QUERY_KEYS } from "@/shared/model"
import { useQuery } from "@tanstack/react-query"
import { commentApi } from "../api/commentApi"

export const useCommentQuery = (postId: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.comments, postId],
    queryFn: async () => {
      const data = await commentApi.getComments(postId)
      return { [postId]: data.comments }
    },
    enabled: false,
  })
}
