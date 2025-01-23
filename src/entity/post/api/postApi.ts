export const getPostsApi = async ({ limit, skip }) => {
  const posts = await fetch(`/api/posts?limit=${limit}&skip=${skip}`).then((response) => response.json())

  return posts
}

export const deletePostApi = async (id: number) => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}
