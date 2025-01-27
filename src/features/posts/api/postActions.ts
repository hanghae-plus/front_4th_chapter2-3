import { Post } from "../../../types/posts"

export const updatePost = async (post: Post) => {
  try {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return await response.json()
  } catch (error) {
    console.error("게시물 업데이트 오류:", error)
    throw error
  }
}

export const deletePost = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
    throw error
  }
}

export const likePost = async (id: number) => {
  try {
    const response = await fetch(`/api/posts/${id}/like`, { method: "POST" })
    return await response.json()
  } catch (error) {
    console.error("게시물 좋아요 오류:", error)
    throw error
  }
}

export const dislikePost = async (id: number) => {
  try {
    const response = await fetch(`/api/posts/${id}/dislike`, { method: "POST" })
    return await response.json()
  } catch (error) {
    console.error("게시물 싫어요 오류:", error)
    throw error
  }
}
