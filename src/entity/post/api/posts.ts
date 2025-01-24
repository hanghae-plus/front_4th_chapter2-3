export const getPostsApi = async ({ limit, skip }) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const posts = await response.json()
  return posts
}

export const deletePostApi = async (id: number) => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}
