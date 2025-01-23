import { useCommentStore } from "./store"

export const useCommentActions = () => {
  const { comments, setComments, selectedComment, setSelectedComment, newComment, setNewComment } = useCommentStore()

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setNewComment({ body: "", postId: null, userId: 1 })
      return true
    } catch (error) {
      console.error("댓글 추가 오류:", error)
      return false
    }
  }

  const updateComment = async () => {
    if (!selectedComment?.id) return false
    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment.body }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      return true
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
      return false
    }
  }

  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
      return true
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
      return false
    }
  }

  const likeComment = async (id: number, postId: number) => {
    try {
      const currentComment = comments[postId].find((c) => c.id === id)
      if (!currentComment) return false

      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: (currentComment.likes || 0) + 1 }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
      return true
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
      return false
    }
  }

  return {
    comments,
    selectedComment,
    newComment,
    setSelectedComment,
    setNewComment,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
  }
}
