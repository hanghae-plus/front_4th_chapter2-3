async function deleteComment(commentId: number) {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })
  const data = await response.json()
  return data
}

export { deleteComment }
