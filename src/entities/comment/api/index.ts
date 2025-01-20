import { Comment } from "@entities/comment/model"

export const commentsApi = {
  // 게시물의 댓글 가져오기
  async fetchCommentsByPostId(postId: number): Promise<Comment[]> {
    const response = await fetch(`/api/comments/post/${postId}`)
    if (!response.ok) {
      throw new Error("댓글을 가져오는데 실패했습니다")
    }
    const data = await response.json()
    return data.comments
  },

  // 댓글 추가
  async addComment(comment: { body: string; postId: number; userId: number }): Promise<Comment> {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    if (!response.ok) {
      throw new Error("댓글 추가에 실패했습니다")
    }
    return response.json()
  },

  // 댓글 수정
  async updateComment(commentId: number, body: string): Promise<Comment> {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    })
    if (!response.ok) {
      throw new Error("댓글 수정에 실패했습니다")
    }
    return response.json()
  },

  // 댓글 삭제
  async deleteComment(commentId: number): Promise<void> {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("댓글 삭제에 실패했습니다")
    }
  },

  // 댓글 좋아요
  async likeComment(commentId: number, currentLikes: number): Promise<Comment> {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: currentLikes + 1 }),
    })
    if (!response.ok) {
      throw new Error("댓글 좋아요에 실패했습니다")
    }
    return response.json()
  },
}
