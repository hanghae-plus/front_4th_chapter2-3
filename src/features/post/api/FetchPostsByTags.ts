import { useStore } from "../../../app/store"
import { fetchPosts } from "./FetchPosts"

// 태그별 게시물 가져오기
export const fetchPostsByTag = async (tag) => {
  // 상태 관리
  const { setPosts, setTotal, setLoading } = useStore.getState()

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
