import { Post, Tag, User } from './types'

export type PostListRes = {
  posts: Post[]
  total: number
  limit: number
  skip: number
}

export type UserListRes = {
  users: User[]
  total: number
  limit: number
  skip: number
}

export type TagListRes = {
  tags: Tag[]
}
