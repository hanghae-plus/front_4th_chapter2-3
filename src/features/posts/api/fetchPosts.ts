import { Post, User } from "../../../types/posts"

export const fetchPosts = async (
  skip: number,
  limit: number,
  tag?: string,
  search?: string,
  sortBy?: string,
  sortOrder?: string,
) => {
  if (tag && tag !== "all") {
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      return {
        posts: postsData.posts.map((post: Post) => ({
          ...post,
          author: usersData.users.find((user: User) => user.id === post.userId),
        })),
        total: postsData.total,
      }
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
      throw error
    }
  }

  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    ...(search && { search }),
    ...(sortBy && sortBy !== "none" && { sortBy }),
    ...(sortOrder && { sortOrder }),
  })

  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts?${params}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])
    const postsData = await postsResponse.json()
    const usersData = await usersResponse.json()

    return {
      posts: postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      })),
      total: postsData.total,
    }
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
    throw error
  }
}
