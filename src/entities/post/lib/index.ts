import { User, UserResponse } from "@/entities/user/model/types"
import { Post, PostsResponse } from "../model/types"

export const mapPostsWithUsers = (postsData: PostsResponse, usersData: UserResponse) => {
  return postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }))
}

export const replacePost = (posts: Post[], data: Post) => {
  return posts.map((post) => (post.id === data.id ? data : post))
}

export const filterPostById = (posts: Post[], id: number) => {
  return posts.filter((post) => post.id !== id)
}
