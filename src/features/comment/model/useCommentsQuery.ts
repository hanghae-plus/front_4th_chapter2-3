import { useQuery } from "@tanstack/react-query"
import { fetchCommentsByPostId } from "@entities/post/api"
import { commentKeys } from "@features/comment/lib"

export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: commentKeys.fetch().queryKey,
    queryFn: () => fetchCommentsByPostId(postId),
  })
}
