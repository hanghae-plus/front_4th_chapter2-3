import React, { useState } from "react"
import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useModalStore } from "../../../shared/model/useModalStore"

type AddCommentModalProps = {
  id: string
}
function AddCommentModal({ id }: AddCommentModalProps) {
  const { closeModal } = useModalStore()

  const [newComment, setNewComment] = useState({ body: "", postId: id, userId: 1 })

  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      await response.json()

      //fetch comments

      closeModal()
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새 댓글 추가</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={newComment.body}
          onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
        />
        <Button onClick={addComment}>댓글 추가</Button>
      </div>
    </DialogContent>
  )
}

export { AddCommentModal }
