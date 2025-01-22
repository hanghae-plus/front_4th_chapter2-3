import { User, UserResponse } from "@/entities/user/model/types"
import { PostsResponse } from "../model/types"

export const postsWithUsers = (postsData: PostsResponse, usersData: UserResponse) => {
  return postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))
}
