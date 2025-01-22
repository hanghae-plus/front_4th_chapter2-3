import { useCallback, useEffect, useState } from "react"
import { getPosts, getPostsBySearchQuery, getPostsByTag } from "../api/post"
import { useParamsStore } from "../store/params"

export const usePosts = () => {
  const { selectedTag, skip, limit, sortBy, sortOrder, searchQuery } = useParamsStore()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  // 게시물 가져오기
  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getPosts(limit, skip)
      setPosts(data)
      setTotal(data.total)
    } catch (error) {
      console.error("게시글 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [limit, skip])

  const fetchPostsByTag = useCallback(
    async (tag: string) => {
      if (!tag || tag === "all") {
        fetchPosts()
        return
      }
      setLoading(true)
      try {
        const data = await getPostsByTag(tag)
        setPosts(data)
        setTotal(data.total)
      } catch (error) {
        console.error("태그별 게시물 가져오기 오류:", error)
      }
      setLoading(false)
    },
    [fetchPosts],
  )

  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await getPostsBySearchQuery(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
  }, [selectedTag, skip, limit, sortBy, sortOrder, fetchPosts, fetchPostsByTag])

  return {
    posts,
    loading,
    total,
    fetchPosts,
    fetchPostsByTag,
    searchPosts,
  }
}
