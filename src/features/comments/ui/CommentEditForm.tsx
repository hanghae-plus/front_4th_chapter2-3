import { Button, Textarea } from "../../../shared/ui"

import type { Comment } from "../../../entities/comment/model/types/comments"

interface CommentEditFormProps {
  selectedComment: Comment
  setSelectedComment: (comment: Comment) => void
}

export const CommentEditForm = ({ selectedComment, setSelectedComment }: CommentEditFormProps) => {
  const updateComment = () => {}

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={selectedComment?.body || ""}
        onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
      />
      <Button onClick={updateComment}>댓글 업데이트</Button>
    </div>
  )
}
