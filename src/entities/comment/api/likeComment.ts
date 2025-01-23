import type { Comment } from "../model/types/comments"

export const likeComment = async (id: number, likeCount: number): Promise<Comment | undefined> => {
  // TODO: 사용하는 곳에서 해당 댓글을 찾아서 처리

  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likeCount }),
    })
    const data = await response.json()
    return data

    // TODO: 사용하는 곳에서 처리
    // setComments((prev) => ({
    //   ...prev,
    //   [postId]: prev[postId].map((comment) =>
    //     comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
    //   ),
    // }))
  } catch (error) {
    // console.error("댓글 좋아요 오류:", error)
    throw error
  }
}
