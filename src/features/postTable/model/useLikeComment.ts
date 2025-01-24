import { useLikeCommentMutation } from "../../../entities/comments/api/hooks/useCommentsMutations"
import { Comment } from "../../../entities/comments/model/types"
import { Post } from "../../../entities/post/model/types"

export const useLikeComment = (postId: Post["id"]) => {
  const { mutate } = useLikeCommentMutation(postId)

  const onLikeComment = (comment: Comment) => {
    mutate(comment)
  }

  return { onLikeComment }
}
