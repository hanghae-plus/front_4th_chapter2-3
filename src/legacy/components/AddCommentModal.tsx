import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from '../../shared/ui'
import { NewComment } from '../models/types'
import { useCreateComment } from '../queries/comments.query'

type AddCommentModalProps = {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: Dispatch<SetStateAction<boolean>>
  newComment: NewComment
  setNewComment: Dispatch<SetStateAction<NewComment>>
  selectedPostId: number
}
export const AddCommentModal = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  selectedPostId,
}: AddCommentModalProps) => {
  const [comment, setComment] = useState('')
  const { mutate: createComment } = useCreateComment()

  const handleAddComment = () => {
    createComment({ userId: 1, postId: selectedPostId, body: comment })
    setShowAddCommentDialog(false)
    setComment('')
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
