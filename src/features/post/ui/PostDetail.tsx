import { highlightText } from "@pages/PostsManagerPage.tsx"
import { Comments } from "@features/post/ui/Comments.tsx"
import { Post } from "@entities/post/types"
import { useSearchParams } from "react-router-dom"
import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"

interface PostDetailProps {
  post: Post
}

export function PostDetail(props: PostDetailProps) {
  const { post } = props
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") ?? ""

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{highlightText(post?.title, searchQuery)}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>{highlightText(post?.body, searchQuery)}</p>
        <Comments postId={post.id} />
      </div>
    </DialogContent>
  )
}
