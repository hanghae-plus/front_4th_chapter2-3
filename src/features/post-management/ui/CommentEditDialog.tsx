import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Textarea } from "../../shared/ui"
import { usePostsStore } from "../../entities/post/model/postsStore"
import { useState, useEffect } from "react"

export const CommentEditDialog = () => {
  const { selectedComment, showEditCommentDialog, setShowEditCommentDialog, handleCommentUpdate } = usePostsStore()

  const [body, setBody] = useState("")

  useEffect(() => {
    if (selectedComment) {
      setBody(selectedComment.body)
    }
  }, [selectedComment])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedComment) return

    handleCommentUpdate({
      ...selectedComment,
      body,
    })
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label>내용</label>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="내용을 입력하세요" />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setShowEditCommentDialog(false)}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
