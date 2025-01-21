import { User } from "@entities/user/model"
import { Comment } from "@entities/comment/model"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  author?: User
  reactions?: {
    likes: number
    dislikes: number
  }
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

// 게시물 관리자 페이지에서 사용되는 추가 타입들
export interface PostState {
  posts: Post[]
  total: number
  skip: number
  limit: number
  searchQuery: string
  selectedPost: Post | null
  sortBy: string
  sortOrder: string
  showAddDialog: boolean
  showEditDialog: boolean
  newPost: Omit<Post, "id">
  loading: boolean
  tags: PostTag[]
  selectedTag: string
  comments: Record<number, Comment[]>
  selectedComment: Comment | null
  newComment: PostComment
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showPostDetailDialog: boolean
  showUserModal: boolean
  selectedUser: User | null
}

export interface PostTag {
  url: string
  slug: string
}

export interface PostComment {
  body: string
  postId: number | null
  userId: number
}

export interface PostSort {
  field: string
  order: "asc" | "desc"
}

export interface PostFilter {
  tag?: string
  search?: string
  sort?: PostSort
  pagination: {
    skip: number
    limit: number
  }
}
