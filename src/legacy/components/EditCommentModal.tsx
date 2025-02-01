import { Dispatch, SetStateAction } from 'react'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from '../../shared/ui'
import { Comment } from '../models/types'

type EditCommentModalProps = {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>
  selectedComment: Comment | null
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
  updateComment: () => void
}

export const EditCommentModal = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  setSelectedComment,
  updateComment,
}: EditCommentModalProps) => {
  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ''}
            onChange={(e) => setSelectedComment(selectedComment ? { ...selectedComment, body: e.target.value } : null)}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
