export interface Tag {
  slug: string
  name: string
  url: string
}

export type TagResponse = Tag[]

export interface Comment {
  id: number
  body: string
  postId: number | null
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
  userId?: number
}
