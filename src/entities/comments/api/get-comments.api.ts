async function getComments(postId: number) {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}

export { getComments }
