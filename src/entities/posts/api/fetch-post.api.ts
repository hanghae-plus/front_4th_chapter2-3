import { Author, type Post } from "../model/types"

interface FetchPostsParams {
  limit: number
  skip: number
  searchQuery?: string
  sortBy?: string
  sortOrder?: string
  tag?: string
}

interface FetchPostsResponse {
  posts: Post[]
  total: number
}

async function fetchPostsWithUsers(props: FetchPostsParams): Promise<FetchPostsResponse> {
  const { limit, skip, searchQuery, sortBy, sortOrder, tag } = props

  try {
    const postsEndpoint =
      tag && tag !== "all"
        ? `/api/posts/tag/${tag}?limit=${limit}&skip=${skip}`
        : searchQuery
          ? `/api/posts/search?q=${searchQuery}`
          : `/api/posts?limit=${limit}&skip=${skip}&&sortBy=${sortBy}&sortOrder=${sortOrder}`

    const [postsResponse, usersResponse] = await Promise.all([
      fetch(postsEndpoint),
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
