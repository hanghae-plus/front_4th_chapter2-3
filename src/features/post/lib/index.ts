import { fetchPosts } from "@/entities/post/api"
import { fetchUsers } from "@/entities/user/api"
import { PostResponse, PostWithUser, SearchParams } from "@entities/post/types"
import { User } from "@entities/user/types"

export const transformPostsWithUser = (postsData: PostResponse, usersData: User[]) => {
  const postsWithUsers: PostWithUser[] = postsData.posts.map((post) => ({
    ...post,
    author: usersData.find((user) => user.id === post.userId) as User,
  }))
  const total = postsData.total
  return { postsWithUsers, total }
}

export const getPostsWithUsers = async (params: SearchParams) => {
  const [postsData, usersData] = await Promise.all([fetchPosts(params), fetchUsers()])
  return transformPostsWithUser(postsData, usersData)
}
