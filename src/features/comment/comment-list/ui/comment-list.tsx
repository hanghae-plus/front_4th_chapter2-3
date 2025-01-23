import { CommentItem, CommentItemSkeleton } from "@/entities/comments"

import { useSearchParams } from "@/shared/hooks/use-search-params"
import { CommentAddDialog } from "@/widgets/comments/comment-add/ui/comment-add-dialog"
import { CommentEditDialog } from "@/widgets/comments/comment-edit"
import { CommentDeleteButton } from "../../comment-delete"
import { CommentLikeButton } from "../../comment-like"
import { useQueryComments } from "../model/use-query-comments"

interface CommentListProps {
  postId?: number
}

function CommentList(props: CommentListProps) {
  const { postId } = props

  const { getParam } = useSearchParams()
  const searchQuery = getParam("search") || ""

  const { commentData, isLoading } = useQueryComments(postId)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <CommentAddDialog postId={postId} />
      </div>
      <div className="space-y-1">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <CommentItemSkeleton key={index} />)
          : commentData?.comments?.map((comment) => (
              <CommentItem
                key={comment.id}
                id={comment.id}
                body={comment.body}
                user={comment.user}
                likes={comment.likes}
                searchQuery={searchQuery}
                renderLikeButton={() => (
                  <CommentLikeButton postId={postId} commentId={comment.id} likes={comment.likes} />
                )}
                renderEditDialog={() => <CommentEditDialog comment={comment} />}
                renderDeleteButton={() => <CommentDeleteButton comment={comment} />}
              />
            ))}
      </div>
    </div>
  )
}

export { CommentList }
