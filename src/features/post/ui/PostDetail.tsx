import { DialogContent, DialogHeader, DialogTitle } from "@shared/ui"
import { CommentList } from "@features/comment/ui/CommentList.tsx"
import { PostWithUser } from "@entities/post/types"
import { useSearchParams } from "react-router-dom"
import { HighlightText } from "@shared/ui"

interface PostDetailProps {
  post: PostWithUser
}

export function PostDetail(props: PostDetailProps) {
  const { post } = props
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") ?? ""

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>
          <HighlightText text={post?.title} highlight={searchQuery} />
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          <HighlightText text={post?.body} highlight={searchQuery} />
        </p>
        <CommentList postId={post.id} />
      </div>
    </DialogContent>
  )
}
