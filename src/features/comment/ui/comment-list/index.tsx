import { Plus } from "lucide-react"
import { Button } from "@shared/ui"
import { CommentView } from "@entities/comment/ui"
import { CommentActionButtons } from "@features/comment/ui"
import { useCommentStore } from "@features/comment/model/stores"
import { usePostStore } from "@features/post/model/stores"
import { useEffect } from "react"

export const CommentList = () => {
  const { comments, fetchComments, setShowAddCommentDialog, setNewComment } = useCommentStore()

  const { selectedPost } = usePostStore()

  useEffect(() => {
    if (selectedPost?.id) {
      fetchComments(selectedPost.id)
    }
  }, [selectedPost?.id, fetchComments])

  const handleAddComment = () => {
    if (selectedPost?.id) {
      setNewComment({
        body: "",
        postId: selectedPost.id,
        userId: 1,
      })
      setShowAddCommentDialog(true)
    }
  }

  if (!selectedPost) return null

  const postComments = selectedPost.id ? comments[selectedPost.id] || [] : []

  return (
    <div className="space-y-4">
      <p>{selectedPost.body}</p>
      <div className="mt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">댓글</h3>
          <Button size="sm" onClick={handleAddComment}>
            <Plus className="w-3 h-3 mr-1" />
            댓글 추가
          </Button>
        </div>

        <div className="space-y-1">
          {postComments.map((comment) => (
            <div key={comment.id} className="flex items-center justify-between border-b pb-1">
              <CommentView username={comment.user?.username || ""} body={comment.body || ""} likes={comment.likes || 0} />
              <CommentActionButtons comment={comment} postId={selectedPost.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
