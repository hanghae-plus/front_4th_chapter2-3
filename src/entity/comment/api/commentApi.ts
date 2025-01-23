export const deleteCommentApi = async (id) => {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}
export const updateCommentApi = async (id, params) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
  await response.json()
}
export const getCommentsApi = async (postId) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()

  return data.comments
}
