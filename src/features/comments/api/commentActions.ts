import { Comment } from "../../../types/posts"

export const updateComment = async (comment: Comment) => {
  try {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    return await response.json()
  } catch (error) {
    console.error("댓글 업데이트 오류:", error)
    throw error
  }
}

export const deleteComment = async (id: number) => {
  try {
    await fetch(`/api/comments/${id}`, { method: "DELETE" })
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
    throw error
  }
}

export const likeComment = async (id: number) => {
  try {
    const response = await fetch(`/api/comments/${id}/like`, { method: "POST" })
    return await response.json()
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
    throw error
  }
}
