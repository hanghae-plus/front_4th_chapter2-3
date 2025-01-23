interface UserResponse {
  id: number
  username: string
  image: string
}

interface Reactions {
  dislikes: number
  likes: number
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
  views: number
  tags: string[]
  reactions: Reactions
  author?: UserResponse
}

interface PostsResponse {
  posts: Post[]
  total: number
  limit: number
  skip: number
}

interface UsersResponse {
  users: UserResponse[]
}

export type {
  UserResponse,
  Reactions,
  Post,
  PostsResponse,
  UsersResponse
}