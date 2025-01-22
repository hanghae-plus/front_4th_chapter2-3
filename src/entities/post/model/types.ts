import { User } from "../../user/model/types"

interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
  author: User
}

type PostDTO = Omit<Post, "author">

interface NewPost {
  title: Post["title"]
  body: Post["body"]
  userId: User["id"]
}

export type { Post, PostDTO, NewPost }
