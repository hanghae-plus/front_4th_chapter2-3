import { Comment } from "@/entities/comments"
import { CommentEditForm } from "@/features/comment/comment-edit"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Edit2 } from "lucide-react"

interface CommentEditDialogProps {
  comment: Comment
}

function CommentEditDialog(props: CommentEditDialogProps) {
  const { comment } = props

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <CommentEditForm comment={comment} />
      </DialogContent>
    </Dialog>
  )
}

export { CommentEditDialog }
