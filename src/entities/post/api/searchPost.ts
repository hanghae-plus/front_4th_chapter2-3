import type { Post } from "../model/types/post"

export const searchPosts = async (searchQuery: string): Promise<Post | undefined> => {
  // TODO: 사용하는 곳에서 처리
  //   if (!searchQuery) {
  //     fetchPosts()
  //     return
  //   }

  //   setLoading(true)

  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data = await response.json()

    return data
    // TODO: 사용하는 곳에서 처리
    // setPosts(data.posts)
    // setTotal(data.total)
  } catch (error) {
    console.error("게시물 검색 오류:", error)
  }

  // TODO: 사용하는 곳에서 처리
  //   setLoading(false)
}
