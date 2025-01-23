export const deleteCommentApi = async (id) => {
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })

    //fetch comments
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
  }
}
export const updateCommentApi = async (id, params) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
    await response.json()
    //fetch comments
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
  }
}
export const getCommentsApi = async (postId) => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()

    return data.comments
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
  }
}
