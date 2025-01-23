import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Post, Comment, User, Tag } from "../types/posts"

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

        if (tag && tag !== "all") {
          setLoading(true)
          try {
            const [postsResponse, usersResponse] = await Promise.all([
              fetch(`/api/posts/tag/${tag}`),
              fetch("/api/users?limit=0&select=username,image"),
            ])
            const postsData = await postsResponse.json()
            const usersData = await usersResponse.json()

            const postsWithUsers = postsData.posts.map((post: Post) => ({
              ...post,
              author: usersData.users.find((user: User) => user.id === post.userId),
            }))

            setPosts(postsWithUsers)
            setTotal(postsData.total)
          } catch (error) {
            console.error("태그별 게시물 가져오기 오류:", error)
          }
          setLoading(false)
          return
        }

        setLoading(true)
        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
          ...(search && { search }),
          ...(sortBy && sortBy !== "none" && { sortBy }),
          ...(sortOrder && { sortOrder }),
        })

        try {
          const [postsResponse, usersResponse] = await Promise.all([
            fetch(`/api/posts?${params}`),
            fetch("/api/users?limit=0&select=username,image"),
          ])
          const postsData = await postsResponse.json()
          const usersData = await usersResponse.json()

          const postsWithUsers = postsData.posts.map((post: Post) => ({
            ...post,
            author: usersData.users.find((user: User) => user.id === post.userId),
          }))

          setPosts(postsWithUsers)
          setTotal(postsData.total)
        } catch (error) {
          console.error("게시물 가져오기 오류:", error)
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
          await fetch(`/api/posts/${id}`, { method: "DELETE" })
          setPosts(posts.filter((post) => post.id !== id))
        } catch (error) {
          console.error("게시물 삭제 오류:", error)
        }
      },

      handlePostUpdate: async (updatedPost: Post) => {
        try {
          const response = await fetch(`/api/posts/${updatedPost.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPost),
          })
          const data = await response.json()

          const { posts, setPosts } = get()
          setPosts(posts.map((post) => (post.id === data.id ? data : post)))
          set({ showEditDialog: false })
        } catch (error) {
          console.error("게시물 업데이트 오류:", error)
        }
      },

      handlePostLike: async (id: number) => {
        try {
          const response = await fetch(`/api/posts/${id}/like`, { method: "POST" })
          const updatedPost = await response.json()

          const { posts, setPosts } = get()
          setPosts(posts.map((post) => (post.id === id ? { ...post, reactions: updatedPost.reactions } : post)))
        } catch (error) {
          console.error("게시물 좋아요 오류:", error)
        }
      },

      handlePostDislike: async (id: number) => {
        try {
          const response = await fetch(`/api/posts/${id}/dislike`, { method: "POST" })
          const updatedPost = await response.json()

          const { posts, setPosts } = get()
          setPosts(posts.map((post) => (post.id === id ? { ...post, reactions: updatedPost.reactions } : post)))
        } catch (error) {
          console.error("게시물 싫어요 오류:", error)
        }
      },

      handleCommentLike: async (id: number, postId: number) => {
        try {
          const response = await fetch(`/api/comments/${id}/like`, { method: "POST" })
          const updatedComment = await response.json()

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

      handleCommentEdit: (comment: Comment) => {
        set({
          selectedComment: comment,
          showEditCommentDialog: true,
        })
      },

      handleCommentDelete: async (id: number, postId: number) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return
        try {
          await fetch(`/api/comments/${id}`, { method: "DELETE" })

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

      handleUserDetail: async (userId: number) => {
        try {
          const response = await fetch(`/api/users/${userId}`)
          const user = await response.json()
          set({
            selectedUser: user,
            showUserModal: true,
          })
        } catch (error) {
          console.error("사용자 정보 가져오기 오류:", error)
        }
      },

      handleCommentUpdate: async (updatedComment) => {
        try {
          const response = await fetch(`/api/comments/${updatedComment.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedComment),
          })
          const data = await response.json()

          const { posts, setPosts } = get()
          setPosts(
            posts.map((post) => {
              if (post.comments) {
                return {
                  ...post,
                  comments: post.comments.map((comment) => (comment.id === data.id ? data : comment)),
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
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSelectedTag: (tag: string) => set({ selectedTag: tag }),
      setSortBy: (sortBy: string) => set({ sortBy }),
      setSortOrder: (sortOrder: string) => set({ sortOrder }),
      setShowEditCommentDialog: (show: boolean) => set({ showEditCommentDialog: show }),
      setShowUserModal: (show: boolean) => set({ showUserModal: show }),

      fetchTags: async () => {
        try {
          const response = await fetch("/api/tags")
          const data = await response.json()
          set({ tags: data })
        } catch (error) {
          console.error("태그 가져오기 오류:", error)
        }
      },
    }),
    { name: "PostsStore" },
  ),
)
