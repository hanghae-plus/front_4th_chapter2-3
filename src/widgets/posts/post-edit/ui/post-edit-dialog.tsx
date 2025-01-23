import { Post } from "@/entities/posts"
import { PostEditForm } from "@/features/post/post-edit"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared"
import { Edit2 } from "lucide-react"

interface PostEditDialogProps {
  post?: Post
}

function PostEditDialog(props: PostEditDialogProps) {
  const { post } = props

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <PostEditForm post={post} />
      </DialogContent>
    </Dialog>
  )
}

export { PostEditDialog }
