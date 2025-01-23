import { addComment } from "../../../entities/comment/api/addComment"
import { Button, Textarea } from "../../../shared/ui"

import type { NewComment } from "../../../entities/comment/model/types/comments"

interface CommentAddFormProps {
  newComment: NewComment
  setNewComment: (comment: NewComment) => void
}

export const CommentAddForm = ({ newComment, setNewComment }: CommentAddFormProps) => {
  //TODO: 추후 내부 엔티티들은 전역 상태로 관리하고 API 로직은 React Query로 추출
  const handleAddCommentClick = async (newComment: NewComment) => {
    try {
      const response = await addComment(newComment)

      // setComments((prev) => ({
      //   ...prev,
      //   [data.postId]: [...(prev[data.postId] || []), data],
      // }))
      // setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={newComment.body}
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
      />
      <Button onClick={() => handleAddCommentClick(newComment)}>댓글 추가</Button>
    </div>
  )
}
