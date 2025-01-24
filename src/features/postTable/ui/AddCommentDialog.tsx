import { useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Textarea } from "../../../shared/ui"
import { Plus } from "lucide-react"
import { Post } from "../../../entities/post/model/types"
import { useAddComment } from "../model/useAddComment"
import { User } from "../../../entities/user/api/userApi"

export const AddCommentDialog = ({ postId }: { postId: Post["id"] }) => {
  const [newComment, setNewComment] = useState<{
    body: string
    userId: User["id"]
  }>({ body: "", userId: 1 })

  const { onAddComment } = useAddComment(postId)

  const handleAddComment = () => {
    onAddComment({ ...newComment, postId })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </DialogTrigger>

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
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
