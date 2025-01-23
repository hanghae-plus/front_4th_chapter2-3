import {
  Comment,
  CommentsResponse,
  DeletedPost,
  Post,
  PostResponse,
  RequestComment,
  RequestPost,
  SearchParams,
  Tag,
} from "../types"

export const fetchTags = async () => {
  const response = await fetch("/api/posts/tags")
  const data: Tag[] = await response.json()
  return data
}

export const fetchPosts = async ({ limit, skip, sortBy, sortOrder }: SearchParams) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${sortOrder}`)
  const data: PostResponse = await response.json()
  return data
}

export const searchPost = async (searchQuery: string) => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  const data: PostResponse = await response.json()
  return data
}

export const searchPostByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  const data: PostResponse = await response.json()
  return data
}

export const addPost = async (newPost: RequestPost) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })

  if (!response.ok) {
    throw new Error("Failed to add a post")
  }

  const data: Post = await response.json()
  return data
}

export const updatePost = async (post: Post | null) => {
  if (!post) return

  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })

  if (!response.ok) {
    throw new Error("Failed to update post")
  }

  const data: Post = await response.json()
  return data
}

export const deletePost = async (id: number) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete a post")
  }

  const data: DeletedPost = await response.json()
  return data
}

export const fetchCommentsByPostId = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)

  if (!response.ok) {
    throw new Error("Failed to fetch a comment")
  }

  const data: CommentsResponse = await response.json()
  return data
}

export const likeComment = async (id: number, likes: { likes: number }) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(likes),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch a comment")
  }
  const data: Comment = await response.json()
  return data
}

export const updateComment = async (comment: Comment) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: comment.body }),
  })

  if (!response.ok) {
    throw new Error("Failed to update comment")
  }

  const data: Comment = await response.json()
  return data
}

export const addComment = async (newComment: RequestComment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })

  if (!response.ok) {
    throw new Error("Failed to add a comment")
  }

  const data: Comment = await response.json()
  return data
}

export const deleteComment = async (id: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete a comment")
  }

  const data: Comment = await response.json()
  return data
}
