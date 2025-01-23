import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../shared/ui"
import { Comment } from "../types/comment"
import { useDialogStore } from "../store/dialog"
import { useComments } from "../hooks/useComments"

interface Props {
  postId: number
  selectedComment: Comment
  onSelectComment: (comment: Comment) => void
}

export const CommentUpdateDialog = ({ postId, selectedComment, onSelectComment }: Props) => {
  const { dialogs, onOpenChange } = useDialogStore()

  const { updateComment } = useComments(postId)

  const handleUpdateComment = async () => {
    // ! null 처리 방식 통일 시켜야됨.. if(selectedComment 할건지...) -> 나는 이 컴포넌트가 켜질 때 selectedComment가 없는 건 말이 안된다라고 간주.
    updateComment(selectedComment, {
      onSuccess: () => {
        onOpenChange("editCommentDialog", false)
      },
    })
  }

  return (
    <Dialog
      open={dialogs["editCommentDialog"]}
      onOpenChange={(open: boolean) => onOpenChange("editCommentDialog", open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => {
              if (selectedComment) {
                onSelectComment({ ...selectedComment, body: e.target.value })
              }
            }}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
