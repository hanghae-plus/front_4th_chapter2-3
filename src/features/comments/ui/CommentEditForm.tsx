import { updateComment } from "../../../entities/comment/api/updateComment"
import { Button, Textarea } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface CommentEditFormProps {
  selectedComment: Comment
  setSelectedComment: (comment: Comment) => void
}

export const CommentEditForm = ({ selectedComment, setSelectedComment }: CommentEditFormProps) => {
  const handleUpdateCommentClick = async (selectedComment: Comment) => {
    try {
      const response = await updateComment(selectedComment)
      // setComments((prev) => ({
      //   ...prev,
      //   [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      // }))
      // setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={selectedComment?.body || ""}
        onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
      />
      <Button onClick={() => handleUpdateCommentClick(selectedComment)}>댓글 업데이트</Button>
    </div>
  )
}
