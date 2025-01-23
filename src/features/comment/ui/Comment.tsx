import { Button, HighlightText } from "@shared/ui"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { CommentUpdate } from "@features/comment/ui/CommentUpdate.tsx"
import { Comment as CommentType } from "@entities/comment/types"
import { useDeleteCommentMutation, useLikeCommentsMutation } from "@features/comment/model"
import { useSearchParams } from "react-router-dom"
import { useModalStore } from "@shared/model"

interface CommentProps {
  comment: CommentType
}

export function Comment(props: CommentProps) {
  const { comment } = props
  const { mutate: likeComment } = useLikeCommentsMutation()
  const { mutate: deleteComment } = useDeleteCommentMutation()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") ?? ""
  const { openModal } = useModalStore()

  const handleLikeClick = async (id: number) => {
    const likes = { likes: comment.likes + 1 }
    likeComment({ id, likes })
  }

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">
          <HighlightText text={comment.body} highlight={searchQuery} />
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => handleLikeClick(comment.id)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            openModal(<CommentUpdate comment={comment} />)
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
