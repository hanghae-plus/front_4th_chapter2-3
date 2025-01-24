export const commentApi = {
  getComments: async (postId: number) => {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    return data.comments
  },
  addComment: async (newComment: { body: string; postId: number; userId: number }) => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    return response.json()
  },
  updateComment: async (id: number, params: any) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
    return response.json()
  },
  deleteComment: async (id: number) => {
    await fetch(`/api/comments/${id}`, { method: "DELETE" })
  },
}
