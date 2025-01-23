import { CommentAddForm } from "@/features/comment/comment-add"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared"
import { Plus } from "lucide-react"

interface CommentAddDialogProps {
  postId?: number
}

function CommentAddDialog(props: CommentAddDialogProps) {
  const { postId } = props

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <CommentAddForm postId={postId} />
      </DialogContent>
    </Dialog>
  )
}

export { CommentAddDialog }
