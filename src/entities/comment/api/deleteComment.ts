export const deleteComment = async (id: number, postId: number) => {
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })

    // TODO: 사용하는 곳에서 처리
    // setComments((prev) => ({
    //   ...prev,
    //   [postId]: prev[postId].filter((comment) => comment.id !== id),
    // }))
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
  }
}
