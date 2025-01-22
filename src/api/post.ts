import { NewPost, Post, Posts, PostWithUser } from "../types/post"
import { PartialUser, Users } from "../types/user"
import { getAllUsers } from "./user"

export const getPosts = async (limit: number, skip: 1 | 0): Promise<Posts> => {
  const [postsResponse, usersResponse] = await Promise.all([
    fetch(`/api/posts?limit=${limit}&skip=${skip}`),
    getAllUsers(),
  ])

  const postsData = (await postsResponse.json()) as Posts
  const usersData = (await usersResponse.json()) as Users

  const postsWithUsers = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId) as PartialUser,
  }))

  return {
    ...postsData,
    posts: postsWithUsers,
  }
}

export const getPostsByTag = async (tag: string): Promise<Posts> => {
  const [postsResponse, usersResponse] = await Promise.all([fetch(`/api/posts/tag/${tag}`), getAllUsers()])
  const postsData = (await postsResponse.json()) as Posts
  const usersData = (await usersResponse.json()) as Users

  const postsWithUsers = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId) as PartialUser,
  }))

  return {
    ...postsData,
    posts: postsWithUsers,
  }
}

export const getPostsBySearchQuery = async (searchQuery: string): Promise<Posts> => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data = (await response.json()) as Posts

  return data
}

export const addPost = async (newPost: NewPost) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  return data
}

export const deletePost = async (id: number) => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}

export const updatePost = async (selectedPost: Post) => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  const data = await response.json()
  return data
}
