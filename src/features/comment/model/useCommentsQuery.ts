import { useQuery } from "@tanstack/react-query"
import { fetchCommentsByPostId } from "@entities/post/api"

export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: ["/api/comments/post"],
    queryFn: () => fetchCommentsByPostId(postId),
  })
}
