import { AddCommentDialog } from "./AddCommentDialog"
import { Post } from "../../../entities/post/model/types"
import { useGetComments } from "../../../entities/comments/api/hooks/useCommentsQueries"
import { HighlightText } from "../../../shared/ui"
import { LikeCommentButton } from "./LikeCommentButton"
import { EditCommentDialog } from "./EditCommentDialog"
import { DeleteCommentButton } from "./DeleteCommentButton"
import { usePostSearchStore } from "../../postSearch/model/store"

export const Comments = ({ postId }: { postId: Post["id"] }) => {
  const { searchQuery } = usePostSearchStore()
  const { data } = useGetComments(postId)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <AddCommentDialog postId={postId} />
      </div>

      <div className="space-y-1">
        {data?.comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <LikeCommentButton comment={comment} postId={postId} />
              <EditCommentDialog comment={comment} />
              <DeleteCommentButton comment={comment} postId={postId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
