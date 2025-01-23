import { create } from "zustand"
import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/api/userApi"

interface PostsStore {
  postsWithUsers: PostWithUser[]
  setPostsWithUsers: (posts: Post[], users: User[]) => void
}

export const usePostsStore = create<PostsStore>((set) => ({
  postsWithUsers: [],
  setPostsWithUsers: (posts, users) => {
    const postsWithUsers = posts
      .map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      }))
      .filter((post): post is PostWithUser => post.author !== undefined)

    set({ postsWithUsers })
  },
}))
