import { getAllUsers } from "./user"

export const getPosts = async (limit: number, skip: 1 | 0) => {
  const [postsResponse, usersResponse] = await Promise.all([
    fetch(`/api/posts?limit=${limit}&skip=${skip}`),
    getAllUsers(),
  ])

  const postsData = await postsResponse.json()
  const usersData = await usersResponse.json()

  const postsWithUsers = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId),
  }))

  return postsWithUsers
}

export const getPostsByTag = async (tag: string) => {
  const [postsResponse, usersResponse] = await Promise.all([fetch(`/api/posts/tag/${tag}`), getAllUsers()])
  const postsData = await postsResponse.json()
  const usersData = await usersResponse.json()

  const postsWithUsers = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId),
  }))

  return postsWithUsers
}

export const getPostsBySearchQuery = async (searchQuery: string) => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = await response.json()

  return data
}

export const addPost = async (newPost) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  return data
}

export const deletePost = async (id: string) => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}

export const updatePost = async (selectedPost) => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  const data = await response.json()
  return data
}
