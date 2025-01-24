import { Post } from "../../../entities/post/model/types"

export interface PostTableProps {
  posts: Post[]
  searchQuery: string
  selectedTag: string
  onTagSelect: (tag: string) => void
  onUserClick: (author: Post["author"]) => void
  onPostDetail: (post: Post) => void
  onEditPost: (post: Post) => void
  onDeletePost: (id: number) => void
}

export interface PostTableRowProps {
  post: Post
  searchQuery: string
  selectedTag: string
  onTagSelect: (tag: string) => void
  onUserClick: (author: Post["author"]) => void
  onPostDetail: (post: Post) => void
  onEditPost: (post: Post) => void
  onDeletePost: (id: number) => void
}
