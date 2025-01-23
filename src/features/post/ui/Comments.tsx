import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"

import { useCommentsQuery, useDeleteCommentMutation, useLikeCommentsMutation } from "@features/post/model"
import { Comment } from "@entities/post/types"
import { useModalStore } from "@shared/model"
import { CommentUpdate } from "@features/post/ui/CommentUpdate.tsx"
import { useSearchParams } from "react-router-dom"
import { CommentAdd } from "@features/post/ui/CommentAdd.tsx"
import { Button } from "@/shared/ui/button"
import { highlightText } from "@/pages/PostsManagerPage"

interface CommentsProps {
  postId: number
}

export function Comments(props: CommentsProps) {
  const { postId } = props
  const { data: commentsResponse } = useCommentsQuery(postId)
  const comments = commentsResponse?.comments
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") ?? ""

  const { mutate: likeComment } = useLikeCommentsMutation()
  const { mutate: deleteComment } = useDeleteCommentMutation()
  const { onOpen } = useModalStore()

  const handleLikeClick = async (id: number) => {
    if (!comments) return

    const comment = comments.find((c) => c.id === id) as Comment
    const likes = { likes: comment.likes + 1 }
    likeComment({ id, likes })
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            onOpen(<CommentAdd postId={postId} />)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
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
                  onOpen(<CommentUpdate comment={comment} />)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
