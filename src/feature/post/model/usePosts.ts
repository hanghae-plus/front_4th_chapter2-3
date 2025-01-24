import { useEffect, useState } from "react"
import {
  deletePostApi,
  getPostsApi,
  getPostsbyTagApi,
  searchPostsApi,
  updateePostApi,
} from "../../../entity/post/api/posts"
import { getUsersApi } from "../../../entity/user/api/users"
import { Post } from "../../../entity/post/model/types"
import { useModalStore } from "../../../shared/model/useModalStore"
import { useQueryParams } from "../../../shared/model/useQueryParams"

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState()
  const [loading, setLoading] = useState(false)

  const { searchQuery, skip, limit, updateURL, sortBy, sortOrder, selectedTag, setSelectedTag } = useQueryParams()

  const { closeModal } = useModalStore()

  useEffect(() => {
    if (selectedTag) {
      getPostByTag()
    } else {
      getPost()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  const getPost = async () => {
    try {
      setLoading(true)

      const postsData = await getPostsApi({ limit, skip })
      const usersData = await getUsersApi()
      console.log("postsData.posts", postsData.posts)

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPostByTag = async () => {
    if (!selectedTag || selectedTag === "all") {
      getPost()
      return
    }

    try {
      setLoading(true)

      const postsData = await getPostsbyTagApi(tag)
      const usersData = await getUsersApi()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 게시물 업데이트
  const updatePost = async (selectedPost: Post) => {
    try {
      const data = await updateePostApi(selectedPost)
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      closeModal()
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  const deletePost = async (id: number) => {
    try {
      await deletePostApi(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  const searchPosts = async () => {
    if (!searchQuery) {
      getPost()
      return
    }
    setLoading(true)
    try {
      const data = await searchPostsApi(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  return { getPost, deletePost, getPostByTag, updatePost, searchPosts, posts, total, loading }
}
