import { useDeleteCommentMutation } from "../../../entities/comments/api/hooks/useCommentsMutations"
import { Post } from "../../../entities/post/model/types"

export const useDeleteComment = (postId: Post["id"]) => {
  const { mutate } = useDeleteCommentMutation(postId)

  return { onDeleteComment: mutate }
}
