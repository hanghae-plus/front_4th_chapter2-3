import { Post, usePostStore } from "@/entities/posts"
import { PostEditForm } from "@/features/post-edit-form"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared"
import { Edit2 } from "lucide-react"

interface PostEditDialogProps {
  post: Post
}

function PostEditDialog(props: PostEditDialogProps) {
  const { post } = props
  const { setSelectedPost } = usePostStore()

  const handleOpenChange = () => {
    setSelectedPost(post)
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <PostEditForm />
      </DialogContent>
    </Dialog>
  )
}

export { PostEditDialog }
