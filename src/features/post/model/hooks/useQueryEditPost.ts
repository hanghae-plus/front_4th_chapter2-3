// TODO: react-query 적용 예정

import type { Post } from "../types/post"

export const useQueryEditPost = (
  selectedPost: Post,
  posts: Post[],
  onShowEditDialog: (open: boolean) => void,
  onChangeEditPosts: (posts: any[]) => void,
) => {
  const onUpdatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      onChangeEditPosts(posts.map((post) => (post.id === data.id ? data : post)))
      onShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return { onUpdatePost }
}
