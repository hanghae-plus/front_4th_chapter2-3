import type { Comment } from "../model/types/comments"

export const updateComment = async (selectedComment: Comment) => {
  try {
    const response = await fetch(`/api/comments/${selectedComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment.body }),
    })
    const data = await response.json()

    return data

    // TODO: 호출하는 곳에서 처리하도록 수정
    // setComments((prev) => ({
    //   ...prev,
    //   [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
    // }))
    // setShowEditCommentDialog(false)
  } catch (error) {
    console.error("댓글 업데이트 오류:", error)
  }
}
