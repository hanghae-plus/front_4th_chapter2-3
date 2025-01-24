import { useQuery } from "@tanstack/react-query"
import { Post } from "../../../post/model/types"
import { commentsQueryKeys } from "./commentsQueryKeys"
import { commentsApi } from "../commentsApi"

export const useGetComments = (postId: Post["id"]) => {
  return useQuery({
    queryKey: commentsQueryKeys.lists(postId),
    queryFn: () => commentsApi.getComments(postId),
  })
}
