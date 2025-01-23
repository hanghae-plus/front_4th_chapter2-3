import { create } from "zustand"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
}

interface PostStore {
  posts: Post[]
  newPost: Post
  total: number
  skip: number
  limit: number
  searchQuery: string
  selectedPost: Post | null
  sortBy: string
  sortOrder: string // "asc" | "desc"
  showAddDialog: boolean
  showEditDialog: boolean
  loading: boolean
  tags: string[]
  selectedTag: string
  comments: Record<number, Comment[]>
  selectedComment: Comment | null
  newComment: Comment
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showPostDetailDialog: boolean
  showUserModal: boolean
  selectedUser: any // 필요에 따라 사용자 타입 정의

  // 상태 변화를 위한 메소드
  setPosts: (posts: Post[]) => void
  setNewPost: (post: Post) => void
  setTotal: (total: number) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (query: string) => void
  setSelectedPost: (post: Post | null) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: "asc" | "desc") => void
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setLoading: (loading: boolean) => void
  setTags: (tags: string[]) => void
  setSelectedTag: (tag: string) => void
  setComments: (postId: number, comments: Comment[]) => void
  setSelectedComment: (comment: Comment | null) => void
  setNewComment: (comment: Comment) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
  setShowPostDetailDialog: (show: boolean) => void
  setShowUserModal: (show: boolean) => void
  setSelectedUser: (user: any) => void
}

const queryParams = new URLSearchParams(location.search)

export const useStore = create<PostStore>((set) => ({
  posts: [],
  newPost: {
    id: 0,
    title: "",
    body: "",
    userId: 1,
  },
  total: 0,
  skip: parseInt(queryParams.get("skip") || "0"),
  limit: parseInt(queryParams.get("limit") || "10"),
  searchQuery: queryParams.get("search") || "",
  selectedPost: null,
  sortBy: queryParams.get("sortBy") || "",
  sortOrder: queryParams.get("sortOrder") || "asc",
  showAddDialog: false,
  showEditDialog: false,
  loading: false,
  tags: [],
  selectedTag: queryParams.get("tag") || "",
  comments: {},
  selectedComment: null,
  newComment: {
    body: "",
    postId: 0,
    userId: 1,
    id: 0,
    likes: 0,
  },
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  showPostDetailDialog: false,
  showUserModal: false,
  selectedUser: null,

  setPosts: (posts) => set({ posts }),
  setNewPost: (post) => set({ newPost: post }),
  setTotal: (total) => set({ total }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setLoading: (loading) => set({ loading }),
  setTags: (tags) => set({ tags }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setComments: (postId, comments) =>
    set((state) => ({
      comments: { ...state.comments, [postId]: comments },
    })),
  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setNewComment: (comment) => set({ newComment: comment }),
  setShowAddCommentDialog: (show) => set({ showAddCommentDialog: show }),
  setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
  setShowUserModal: (show) => set({ showUserModal: show }),
  setSelectedUser: (user) => set({ selectedUser: user }),
}))
