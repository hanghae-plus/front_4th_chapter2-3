// React Query Hooks

import { CommentApi } from "../../../entities/comment/api/CommentApi"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../entities/comment/model/constants"

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.comments.byPostId(postId),
    queryFn: () => CommentApi.getComments(postId),
  })
}
