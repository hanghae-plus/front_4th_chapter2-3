import { Post, User } from '../models/types'

export const attachUsersToPost = (posts: Post[], users: User[]) => {
  return posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }))
}
