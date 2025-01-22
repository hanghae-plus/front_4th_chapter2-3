import { useState } from "react"
import { Post } from "../../types/posts"

export const usePostsData = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const fetchPosts = async (skip: number, limit: number) => {
    setLoading(true)
    try {
      console.log(`/api/posts?limit=${limit}&skip=${skip}`)

      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  const handlePostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handlePostEdit = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handlePostDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  const handlePostUpdate = async (updatedPost: Post) => {
    try {
      const response = await fetch(`/api/posts/${updatedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      })
      const data = await response.json()
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return {
    posts,
    total,
    loading,
    selectedPost,
    showPostDetailDialog,
    showEditDialog,
    setShowPostDetailDialog,
    setShowEditDialog,
    fetchPosts,
    handlePostDetail,
    handlePostEdit,
    handlePostDelete,
    handlePostUpdate,
  }
}
