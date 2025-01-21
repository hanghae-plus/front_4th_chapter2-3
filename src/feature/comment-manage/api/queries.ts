// React Query Hooks

import { CommentApi } from "../../../entities/comment/api/CommentApi"
import { useQuery } from "@tanstack/react-query"

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => CommentApi.getComments(postId),
  })
}
