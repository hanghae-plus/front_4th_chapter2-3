import { CommentUser, User } from "@entities/user/types"

export interface Reactions {
  likes: number
  dislikes: number
}

export interface SearchParams {
  limit: string
  skip: string
  tag: string
  searchQuery: string
  sortBy: string
  sortOrder: string
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
}

export type PostWithUser = Post & {
  author: User
}

export type RequestPost = Partial<Post>

export interface DeletedPost extends Post {
  isDeleted: boolean
  deletedOn: Date
}

export interface PostResponse {
  limit: number
  posts: Post[]
  skip: number
  total: number
}

export interface Tag {
  name: string
  slug: string
  url: string
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: CommentUser
}

export type RequestComment = Partial<Comment>

export interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}
