import { useState } from "react"
import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"
import { useDialogStore } from "../../../shared/model/useDialogStore"
import { useLoadingStore } from "../../../shared/model/useLoadingStore"
import { usePostStore } from "./store"
import { usePostsFilter } from "./usePostFilter"

export const usePostActions = () => {
  const [total, setTotal] = useState(0)
  const { posts, setPosts, selectedPost, setSelectedPost, newPost, setNewPost } = usePostStore()
  const { setShowAddDialog, setShowEditDialog } = useDialogStore()
  const { skip, limit, searchQuery } = usePostsFilter()
  const { setLoading } = useLoadingStore()

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const postsResponse = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      const postsData = await postsResponse.json()

      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 게시물 검색
  const searchPosts = async (query?: string) => {
    const searchValue = query || searchQuery
    console.log("검색어:", searchQuery)
    if (!searchValue) {
      fetchPosts()
      console.log("검색어 없음")
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchValue}`)
      const data = await response.json()
      console.log("검색어 있음")
      console.log("검색어 있음ㄴㄴ", data)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${selectedPost?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return {
    total,
    posts,
    selectedPost,
    newPost,
    setSelectedPost,
    setNewPost,
    fetchPosts,
    searchPosts,
    addPost,
    updatePost,
    deletePost,
    fetchPostsByTag,
  }
}
