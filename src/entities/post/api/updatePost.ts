import type { Post, PostWithUser } from "../model/types/post"

export const updatePost = async (selectedPost: PostWithUser): Promise<Post[] | undefined> => {
  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    const data = await response.json()

    return data

    // TODO: 사용하는 곳에서 처리
    // setPosts(posts.map((post) => (post.id === data.id ? data : post)))
    // setShowEditDialog(false)
  } catch (error) {
    // TODO: 사용하는 곳에서 처리
    // console.error("게시물 업데이트 오류:", error)
    throw error
  }
}
