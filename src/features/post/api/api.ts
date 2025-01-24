export const postApi = {
  getPosts: async ({ limit, skip }: { limit: number; skip: number }) => {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts?limit=${limit}&skip=${skip}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])

    const postsData = await postsResponse.json()
    const usersData = await usersResponse.json()

    return {
      posts: postsData.posts.map((post: any) => ({
        ...post,
        author: usersData.users.find((user: any) => user.id === post.userId),
      })),
      total: postsData.total,
    }
  },
  searchPosts: async (query: string) => {
    const response = await fetch(`/api/posts/search?q=${query}`)
    return response.json()
  },
  getPostsByTag: async (tag: string) => {
    const response = await fetch(`/api/posts/tag/${tag}`)
    return response.json()
  },
  addPost: async (post: any) => {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },
  updatePost: async (id: number, post: any) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },
  deletePost: async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
  },
}
