import { useModalStore } from "../../../shared/model/useModalStore"
import { Button, HighlightText } from "../../../shared/ui"
import { AddCommentModal } from "./AddCommentModal"
import { Plus } from "lucide-react"
import useComments from "../model/useComments"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { EditCommentModal } from "./EditCommentModal"
import { useQueryParams } from "../../../shared/model/useQueryParams"
import { useEffect } from "react"

type CommentsProps = {
  postId: number
}

function Comments({ postId }: CommentsProps) {
  const { getComments, comments, likeComment, deleteComment } = useComments()

  const { openModal } = useModalStore()
  const { searchQuery } = useQueryParams()

  useEffect(() => {
    getComments(postId)
  }, [postId])

  console.log(typeof postId)
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            openModal(<AddCommentModal postId={postId} />)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  openModal(<EditCommentModal comment={comment} />)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
