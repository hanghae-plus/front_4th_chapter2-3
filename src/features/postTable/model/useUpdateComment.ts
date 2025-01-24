import { useUpdateCommentMutation } from "../../../entities/comments/api/hooks/useCommentsMutations"
import { Comment } from "../../../entities/comments/model/types"
import { Post } from "../../../entities/post/model/types"

export const useUpdateComment = (postId: Post["id"]) => {
  const { mutate } = useUpdateCommentMutation(postId)

  const onUpdateComment = (comment: Comment | null) => {
    if (!comment) return

    mutate(comment)
  }

  return { onUpdateComment }
}
