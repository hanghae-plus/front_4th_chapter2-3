import { Author, type Post } from "../model/types"

interface FetchPostsParams {
  limit: number
  skip: number
}

interface FetchPostsResponse {
  posts: Post[]
  total: number
}

async function fetchPostsWithUsers(props: FetchPostsParams): Promise<FetchPostsResponse> {
  const { limit, skip } = props

  try {
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(`/api/posts?limit=${limit}&skip=${skip}`),
      fetch("/api/users?limit=0&select=username,image"),
    ])

    const postsData = await postsResponse.json()
    const usersData = await usersResponse.json()

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: Author) => user.id === post.userId),
    }))

    return {
      posts: postsWithUsers,
      total: postsData.total,
    }
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
    throw error
  }
}

export { fetchPostsWithUsers }
