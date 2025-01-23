import { useCommentStore } from "../../../entities/comment/model/store"
import { Comment } from "../../../entities/comment/model/type"

export const useAddToComment = (comment: Comment) => {
  const addComment = useCommentStore((state) => state.addComment)
  addComment(comment)
}
