import { fetchUsers } from "../../user/api"
import { User } from "../../user/types"
import { fetchPosts } from "../api"
import { PostResponse } from "../types"

export const transformPostsWithUser = (postsData: PostResponse, usersData: User[]) =>
  postsData.posts.map((post) => ({
    ...post,
    author: usersData.find((user) => user.id === post.userId),
  }))

export const getPostsWithUsers = async (limit: number, skip: number) => {
  const [postsData, usersData] = await Promise.all([fetchPosts(limit, skip), fetchUsers()])

  return transformPostsWithUser(postsData, usersData)
}
