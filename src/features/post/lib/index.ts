import { fetchPosts } from "@/entities/post/api"
import { fetchUsers } from "@/entities/user/api"
import { PostResponse } from "@entities/post/types"
import { User } from "@entities/user/types"

export const combinePostsWithUser = (postsData: PostResponse, usersData: User[]) =>
  postsData.posts.map((post) => ({
    ...post,
    author: usersData.find((user) => user.id === post.userId),
  }))

export const getPostsWithUsers = async (limit: number, skip: number) => {
  const [postsData, usersData] = await Promise.all([fetchPosts(limit, skip), fetchUsers()])
  console.log(postsData, usersData)
  return combinePostsWithUser(postsData, usersData)
}
