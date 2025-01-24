import { useState } from "react"
import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import useComments from "../model/useComments"
import { Comment } from "../../../entity/comment/model/types"

type EditCommentModalProps = {
  comment: Comment
}
function EditCommentModal({ comment }: EditCommentModalProps) {
  const { updateComment } = useComments()
  const [selectedComment, setSelectedComment] = useState(comment)

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>댓글 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={selectedComment?.body || ""}
          onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
        />
        <Button onClick={() => updateComment(selectedComment)}>댓글 업데이트</Button>
      </div>
    </DialogContent>
  )
}

export { EditCommentModal }
