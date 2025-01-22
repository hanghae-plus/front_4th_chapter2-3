import { useState } from "react"
import { Comment } from "@/types/posts"

export const useComments = () => {
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  const fetchComments = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  const handleCommentLike = async (id: number, postId: number) => {
    try {
      const response = await fetch(`/api/comments/${id}/like`, { method: "POST" })
      const updatedComment = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === id ? updatedComment : comment)),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  const handleCommentEdit = (comment: Comment) => {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  const handleCommentDelete = async (id: number, postId: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return
    try {
      await fetch(`/api/comments/${id}`, { method: "DELETE" })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  const handleCommentUpdate = async (updatedComment: Comment) => {
    try {
      const response = await fetch(`/api/comments/${updatedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedComment),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [updatedComment.postId]: prev[updatedComment.postId].map((comment) =>
          comment.id === data.id ? data : comment,
        ),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return {
    comments,
    selectedComment,
    showEditCommentDialog,
    setShowEditCommentDialog,
    fetchComments,
    handleCommentLike,
    handleCommentEdit,
    handleCommentDelete,
    handleCommentUpdate,
  }
}
