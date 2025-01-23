import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Post, Comment, User, Tag } from "../types/posts"
import { fetchPosts } from "../features/posts/api/fetchPosts"
import { fetchTags } from "../features/posts/api/fetchTags"
import { updatePost, deletePost, likePost, dislikePost } from "../features/posts/api/postActions"
import { updateComment, deleteComment, likeComment } from "../features/comments/api/commentActions"
import { fetchUser } from "../features/users/api/fetchUser"

interface PostsState {
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

  fetchPosts: (skip: number, limit: number, tag?: string, search?: string, sortBy?: string, sortOrder?: string) => void
  handlePostDetail: (post: Post) => void
  handlePostEdit: (post: Post) => void
  handlePostDelete: (id: number) => void
  handlePostUpdate: (post: Post) => Promise<void>
  handlePostLike: (id: number) => Promise<void>
  handlePostDislike: (id: number) => Promise<void>
  handleCommentLike: (id: number, postId: number) => Promise<void>
  handleCommentEdit: (comment: Comment) => void
  handleCommentDelete: (id: number, postId: number) => Promise<void>
  handleUserDetail: (userId: number) => Promise<void>
  handleCommentUpdate: (comment: Comment) => Promise<void>

  // 필터 관련 액션들
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
  setShowEditCommentDialog: (show: boolean) => void
  setShowUserModal: (show: boolean) => void

  fetchTags: () => Promise<void>
}

export const usePostsStore = create<PostsState>()(
  devtools(
    (set, get) => ({
      posts: [],
      total: 0,
      loading: false,
      selectedPost: null,
      selectedComment: null,
      selectedUser: null,
      searchQuery: "",
      selectedTag: "all",
      sortBy: "none",
      sortOrder: "asc",
      showPostDetailDialog: false,
      showEditDialog: false,
      showEditCommentDialog: false,
      showUserModal: false,
      tags: [] as Tag[],

      setPosts: (posts) => set({ posts }),
      setTotal: (total) => set({ total }),
      setLoading: (loading) => set({ loading }),
      setSelectedPost: (post) => set({ selectedPost: post }),
      setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
      setShowEditDialog: (show) => set({ showEditDialog: show }),

      fetchPosts: async (skip, limit, tag, search, sortBy, sortOrder) => {
        const { setPosts, setTotal, setLoading } = get()
        setLoading(true)
        try {
          const { posts, total } = await fetchPosts(skip, limit, tag, search, sortBy, sortOrder)
          setPosts(posts)
          setTotal(total)
        } catch (error) {
          console.error(error)
        }
        setLoading(false)
      },

      handlePostDetail: (post) => {
        set({ selectedPost: post, showPostDetailDialog: true })
      },

      handlePostEdit: (post) => {
        set({ selectedPost: post, showEditDialog: true })
      },

      handlePostDelete: async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return
        const { posts, setPosts } = get()
        try {
          await deletePost(id)
          setPosts(posts.filter((post) => post.id !== id))
        } catch (error) {
          console.error("게시물 삭제 오류:", error)
        }
      },

      handlePostUpdate: async (post) => {
        try {
          const updatedPost = await updatePost(post)
          const { posts, setPosts } = get()
          setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)))
          set({ showEditDialog: false })
        } catch (error) {
          console.error(error)
        }
      },

      handlePostLike: async (id) => {
        try {
          const updatedPost = await likePost(id)
          const { posts, setPosts } = get()
          setPosts(posts.map((post) => (post.id === id ? updatedPost : post)))
        } catch (error) {
          console.error("게시물 좋아요 오류:", error)
        }
      },

      handlePostDislike: async (id) => {
        try {
          const updatedPost = await dislikePost(id)
          const { posts, setPosts } = get()
          setPosts(posts.map((post) => (post.id === id ? updatedPost : post)))
        } catch (error) {
          console.error("게시물 싫어요 오류:", error)
        }
      },

      handleCommentLike: async (id, postId) => {
        try {
          const updatedComment = await likeComment(id)
          const { posts, setPosts } = get()
          setPosts(
            posts.map((post) => {
              if (post.id === postId) {
                return {
                  ...post,
                  comments: post.comments?.map((comment) =>
                    comment.id === id ? { ...comment, likes: updatedComment.likes } : comment,
                  ),
                }
              }
              return post
            }),
          )
        } catch (error) {
          console.error("댓글 좋아요 오류:", error)
        }
      },

      handleCommentEdit: (comment) => {
        set({
          selectedComment: comment,
          showEditCommentDialog: true,
        })
      },

      handleCommentDelete: async (id, postId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return
        try {
          await deleteComment(id)
          const { posts, setPosts } = get()
          setPosts(
            posts.map((post) => {
              if (post.id === postId) {
                return {
                  ...post,
                  comments: post.comments?.filter((comment) => comment.id !== id),
                }
              }
              return post
            }),
          )
        } catch (error) {
          console.error("댓글 삭제 오류:", error)
        }
      },

      handleUserDetail: async (userId) => {
        try {
          const user = await fetchUser(userId)
          set({
            selectedUser: user,
            showUserModal: true,
          })
        } catch (error) {
          console.error("사용자 정보 가져오기 오류:", error)
        }
      },

      handleCommentUpdate: async (comment) => {
        try {
          const updatedComment = await updateComment(comment)
          const { posts, setPosts } = get()
          setPosts(
            posts.map((post) => {
              if (post.comments) {
                return {
                  ...post,
                  comments: post.comments.map((c) => (c.id === updatedComment.id ? updatedComment : c)),
                }
              }
              return post
            }),
          )
          set({ showEditCommentDialog: false })
        } catch (error) {
          console.error("댓글 업데이트 오류:", error)
        }
      },

      // 필터 관련 액션들
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedTag: (tag) => set({ selectedTag: tag }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
      setShowUserModal: (show) => set({ showUserModal: show }),

      fetchTags: async () => {
        try {
          const tags = await fetchTags()
          set({ tags })
        } catch (error) {
          console.error(error)
        }
      },
    }),
    { name: "PostsStore" },
  ),
)
