import React, { useState } from "react"
import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useModalStore } from "../../../shared/model/useModalStore"

type EditCommentModalProps = {
  comment: any
}
function EditCommentModal({ comment }: EditCommentModalProps) {
  const { closeModal } = useModalStore()

  const [selectedComment, setSelectedComment] = useState(comment)

  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment.body }),
      })
      await response.json()
      //fetch comments

      closeModal()
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

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
        <Button onClick={updateComment}>댓글 업데이트</Button>
      </div>
    </DialogContent>
  )
}

export { EditCommentModal }
