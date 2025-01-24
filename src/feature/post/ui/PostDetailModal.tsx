import { DialogContent, DialogHeader, DialogTitle, HighlightText } from "../../../shared/ui"
import Comments from "../../comments/ui/Comments"
import { useQueryParams } from "../../../shared/model/useQueryParams"

type PostDetailModalProps = {
  post: any
}
function PostDetailModal({ post }: PostDetailModalProps) {
  const { searchQuery } = useQueryParams()

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{<HighlightText text={post?.body} highlight={searchQuery} />}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          <HighlightText text={post?.body} highlight={searchQuery} />
        </p>
        <Comments postId={post?.id} />
      </div>
    </DialogContent>
  )
}

export { PostDetailModal }
