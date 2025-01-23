import { useEffect } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"

import { searchQueryAtom } from "@features/searchPost/model"
import { selectedPostAtom } from "@features/postDetail/model"
import { newCommentAtom } from "@features/addComment/model"
import { updateCommentAtom } from "@features/updateComment/model"
import { useDeleteCommentMutation } from "@features/deleteComment/api"
import { useLikeCommentMutation } from "@features/likeComment/api"
import { useCommentsQuery } from "@entities/comment/api"
import { commentsAtom } from "@entities/comment/model"
import { highlightText } from "@shared/lib"
import { dialogAtomFamily } from "@shared/model"
import { Button } from "@shared/ui/common"

export const CommentsList = () => {
  const selectedPost = useAtomValue(selectedPostAtom)
  const [comments, setComments] = useAtom(commentsAtom)
  const searchQuery = useAtomValue(searchQueryAtom)
  // addComment
  const setNewComment = useSetAtom(newCommentAtom)
  const setShowAddCommentDialog = useSetAtom(dialogAtomFamily("add-comment"))

  // updateComment
  const setSelectedComment = useSetAtom(updateCommentAtom)
  const setShowEditCommentDialog = useSetAtom(dialogAtomFamily("update-comment"))

  // deleteComment
  const deleteCommentMutation = useDeleteCommentMutation({
    onSuccess: (deletedCommentId) => {
      setComments((prev) => prev.filter((comment) => comment.id !== deletedCommentId))
    },
  })
  const deleteComment = (commentId: number) => {
    deleteCommentMutation.mutate({ commentId: commentId })
  }

  // likeComment
  const likeCommentMutation = useLikeCommentMutation({
    onSuccess: (commentId) => {
      setComments((prev) => {
        return prev.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, likes: comment.likes + 1 }
          }
          return comment
        })
      })
    },
  })

  // getComments
  const { data, isLoading } = useCommentsQuery(selectedPost?.id)

  useEffect(() => {
    if (!isLoading && data) {
      setComments(data.comments)
    }
  }, [data, isLoading, setComments])

  if (isLoading) return null

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId: selectedPost?.id }))
            setShowAddCommentDialog(true)
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => likeCommentMutation.mutate({ commentId: comment.id, currentLikeCount: comment.likes })}
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
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
