import { useStore } from "../../../app/store"

// 게시물 가져오기
export const fetchPosts = () => {
  // 상태 관리
  const { skip, limit, setPosts, setTotal, setLoading } = useStore.getState()

  setLoading(true)
  let postsData
  let usersData

  fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => {
      postsData = data
      return fetch("/api/users?limit=0&select=username,image")
    })
    .then((response) => response.json())
    .then((users) => {
      usersData = users.users
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
