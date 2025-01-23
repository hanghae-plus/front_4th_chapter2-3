import { useCommentStore } from "../../../entities/comment/model/store"
import { Comment } from "../../../entities/comment/model/type"

export const useEditToComment = () => {
  const updateComment = useCommentStore((state) => state.updateComment)
  const editComment = (updatedComment: Comment) => {
    updateComment(updatedComment)
  }
  return { editComment }
}
