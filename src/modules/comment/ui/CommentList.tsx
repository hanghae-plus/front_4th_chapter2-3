import { PostId } from "@/entities/post/model"
import { useQueryComments } from "@/features/comment/api"
import { CommentAddButton } from "@/features/comment/ui/CommentAddButton"
import { CommentListItem } from "./CommentListItem"

// ui/CommentList.tsx
export function CommentList({ postId }: { postId: PostId }) {
  const { data: commentsOfPost } = useQueryComments(postId)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <CommentAddButton postId={postId} />
      </div>

      <div className="space-y-1">
        {commentsOfPost?.comments?.map((comment) => <CommentListItem key={comment.id} comment={comment} />)}
      </div>
    </div>
  )
}
