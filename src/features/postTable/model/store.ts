import { create } from "zustand"
import { Post } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/api/userApi"
import { PostWithUser } from "./types"

interface PostTableStore {
  postsWithUsers: PostWithUser[]
  selectedPost: Post | null
  limit: number
  skip: number
}

interface PostTableActions {
  addAuthorToPosts: (posts: Post[], users: Pick<User, "id" | "username" | "image">[]) => void
}

export const usePostTableStore = create<PostTableStore & PostTableActions>((set) => ({
  postsWithUsers: [],
  selectedPost: null,
  limit: 10,
  skip: 0,
  addAuthorToPosts: (posts, users) => {
    const postsWithUsers = posts
      .map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      }))
      .filter((post): post is PostWithUser => post.author !== undefined)

    set({ postsWithUsers })
  },
}))
