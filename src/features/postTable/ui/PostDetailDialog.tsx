import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  HighlightText,
} from "../../../shared/ui"
import { MessageSquare } from "lucide-react"
import { usePostSearchStore } from "../../postSearch/model/store"
import { Post } from "../../../entities/post/model/types"

interface PostDetailDialogProps {
  post: Post
}

export const PostDetailDialog = ({ post }: PostDetailDialogProps) => {
  const { searchQuery } = usePostSearchStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={post?.title || ""} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            <HighlightText text={post?.body || ""} highlight={searchQuery} />
          </p>
          {post && "코멘트 영역"}
        </div>
      </DialogContent>
    </Dialog>
  )
}
