import { Button } from "@shared/ui"
import { Plus } from "lucide-react"
import { useCommentsQuery } from "@features/comment/model"
import { Comment as CommentType } from "@entities/comment/types"
import { Comment } from "./Comment.tsx"
import { CommentAdd } from "@features/comment/ui/CommentAdd.tsx"
import { useModalStore } from "@shared/model"

interface CommentsProps {
  postId: number
}

export function CommentList(props: CommentsProps) {
  const { postId } = props
  const { data: commentsResponse } = useCommentsQuery(postId)
  const comments = commentsResponse?.comments
  const { openModal } = useModalStore()

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            openModal(<CommentAdd postId={postId} />)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment: CommentType) => <Comment key={comment.id} comment={comment} />)}
      </div>
    </div>
  )
}
