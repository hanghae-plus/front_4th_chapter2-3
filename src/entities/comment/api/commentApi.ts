export const getCommentsApi = async (postId) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  return response.json();
}

export const createCommentApi = async (newComment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  return response.json()
}

export const updateCommentApi = async (selectedComment) : Promise<any> => {
  const response = await fetch(`/api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })
  return response.json()
}

export const deleteCommentApi = async (id) => {
  return await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}

export const likeCommentApi = async (id, comments, postId) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
  })
  return response.json()
}