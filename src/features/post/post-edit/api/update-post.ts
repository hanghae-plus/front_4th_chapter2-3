import { Post } from "@/entities/posts"

const updatePost = async (selectedPost: Post) => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("게시물 업데이트 오류:", error)
  }
}

export { updatePost }
