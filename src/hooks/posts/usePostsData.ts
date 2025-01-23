import { useState } from "react"
import { Post, User } from "../../types/posts"

interface PostsData {
  posts: Post[]
  total: number
}

interface UsersData {
  users: User[]
}

export const usePostsData = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const fetchPosts = (
    skip: number,
    limit: number,
    tag?: string,
    search?: string,
    sortBy?: string,
    sortOrder?: string,
  ) => {
    if (tag && tag !== "all") {
      fetchPostsByTag(tag)
      return
    }

    setLoading(true)
    let postsData: PostsData
    let usersData: UsersData["users"]

    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      ...(search && { search }),
      ...(sortBy && sortBy !== "none" && { sortBy }),
      ...(sortOrder && { sortOrder }),
    })

    fetch(`/api/posts?${params}`)
      .then((response) => response.json())
      .then((data: PostsData) => {
        postsData = data
        return fetch("/api/users?limit=0&select=username,image")
      })
      .then((response) => response.json())
      .then((data: UsersData) => {
        usersData = data.users
        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.find((user) => user.id === post.userId),
        }))
        setPosts(postsWithUsers)
        setTotal(postsData.total)
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const fetchPostsByTag = async (tag: string) => {
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData: PostsData = await postsResponse.json()
      const usersData: UsersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
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
