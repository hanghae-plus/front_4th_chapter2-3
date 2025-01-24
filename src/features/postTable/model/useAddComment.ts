import { CreateCommentParams } from "../../../entities/comments/api/commentsApi"
import { useCreateCommentMutation } from "../../../entities/comments/api/hooks/useCommentsMutations"
import { Post } from "../../../entities/post/model/types"

export const useAddComment = (postId: Post["id"]) => {
  const { mutate } = useCreateCommentMutation(postId)

  const onAddComment = (comment: CreateCommentParams["body"]) => {
    mutate(comment)
  }

  return { onAddComment }
}
