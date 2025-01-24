import { fetchCommentsByPostId } from "@/entities/comment/api"
import { PostId } from "@/entities/post/model"
import { useQuery } from "@tanstack/react-query"

export function useQueryComments(postId: PostId) {
  return useQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => fetchCommentsByPostId(postId),
  })
}
