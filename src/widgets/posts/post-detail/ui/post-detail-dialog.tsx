import { Post } from "@/entities/posts"
import { CommentList } from "@/features/comment/comment-list"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared"
import { useSearchParams } from "@/shared/hooks/use-search-params"
import { highlightText } from "@/shared/lib/highlight-text"
import { MessageSquare } from "lucide-react"

interface PostDetailDialogProps {
  post: Post
}

function PostDetailDialog(props: PostDetailDialogProps) {
  const { post } = props

  const { getParam } = useSearchParams()
  const searchQuery = getParam("search") || ""

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post?.title || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post?.body || "", searchQuery)}</p>
          <CommentList postId={post?.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { PostDetailDialog }
