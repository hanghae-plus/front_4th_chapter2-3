import { Post, Comment, User, Tag } from "./posts"

export interface PostsState {
  // State
  posts: Post[]
  total: number
  loading: boolean
  selectedPost: Post | null
  selectedComment: Comment | null
  selectedUser: User | null
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  showPostDetailDialog: boolean
  showEditDialog: boolean
  showEditCommentDialog: boolean
  showUserModal: boolean
  tags: Tag[]

  // Actions
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
  setSelectedPost: (post: Post | null) => void
  setShowPostDetailDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
  setShowEditCommentDialog: (show: boolean) => void
  setShowUserModal: (show: boolean) => void

  // Async Actions
  fetchPosts: (
    skip: number,
    limit: number,
    tag?: string,
    search?: string,
    sortBy?: string,
    sortOrder?: string,
  ) => Promise<void>
  fetchTags: () => Promise<void>
  handlePostDetail: (post: Post) => void
  handlePostEdit: (post: Post) => void
  handlePostDelete: (id: number) => Promise<void>
  handlePostUpdate: (post: Post) => Promise<void>
  handlePostLike: (id: number) => Promise<void>
  handlePostDislike: (id: number) => Promise<void>
  handleCommentLike: (id: number, postId: number) => Promise<void>
  handleCommentEdit: (comment: Comment) => void
  handleCommentDelete: (id: number, postId: number) => Promise<void>
  handleUserDetail: (userId: number) => Promise<void>
}
