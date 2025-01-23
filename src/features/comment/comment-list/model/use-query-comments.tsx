import { CommentResponse, getComments } from "@/entities/comments"
import { commentKeys } from "@/entities/comments/api/query-keys"
import { useQuery } from "@tanstack/react-query"

function useQueryComments(postId?: number) {
  const { data: commentData, isLoading } = useQuery<CommentResponse>({
    queryKey: commentKeys.detail(postId),
    queryFn: () => {
      if (!postId) throw new Error("postId가 필요합니다.")
      return getComments(postId)
    },
    enabled: !!postId,
  })

  return { commentData, isLoading }
}

export { useQueryComments }
