import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "../shared/ui"
import { Post, Comment, Tag, User } from "@/types/posts"
import { PostsFilter } from "@/components/posts/PostsFilter"
import { PostsTable } from "@/components/posts/PostsTable"
import { PostsPagination } from "@/components/posts/PostsPagination"
import { PostDetailDialog } from "@/components/posts/PostDetailDialog"
import { PostEditDialog } from "@/components/posts/PostEditDialog"
import { CommentEditDialog } from "@/components/posts/CommentEditDialog"
import { UserDetailDialog } from "@/components/posts/UserDetailDialog"
import { usePostsManager } from "@/hooks/usePostsManager"
import { usePostsData } from "@/hooks/posts/usePostsData"
import { usePagination } from "@/hooks/posts/usePagination"
import { usePostsFilter } from "@/hooks/posts/usePostsFilter"
import { useComments } from "@/hooks/posts/useComments"
import { useUsers } from "@/hooks/posts/useUsers"

interface PostsResponse {
  posts: Post[]
  total: number
}

interface UsersResponse {
  users: User[]
}

interface CommentsResponse {
  comments: Comment[]
}

const PostsManagerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const {
    posts,
    total,
    loading,
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    tags,
    comments,
    selectedPost,
    selectedComment,
    selectedUser,
    showPostDetailDialog,
    showEditDialog,
    showEditCommentDialog,
    showUserModal,
    handleSearchChange,
    handleSearch,
    handleTagChange,
    handleSortByChange,
    handleSortOrderChange,
    handleSkipChange,
    handleLimitChange,
    handlePostDetail,
    handlePostEdit,
    handlePostDelete,
    handlePostUpdate,
    handleCommentLike,
    handleCommentEdit,
    handleCommentDelete,
    handleCommentUpdate,
    handleUserDetail,
    highlightText,
  } = usePostsManager()

  const postsData = usePostsData()
  const pagination = usePagination((skip, limit) => {
    postsData.fetchPosts(skip, limit)
  })
  const postsFilter = usePostsFilter(() => {
    postsData.fetchPosts(pagination.skip, pagination.limit)
  })
  const commentsData = useComments()
  const usersData = useUsers()

  const [newPost, setNewPost] = useState<Partial<Post>>({ title: "", body: "", userId: 1 })
  const [newComment, setNewComment] = useState<Partial<Comment>>({ body: "", postId: 0, userId: 1 })
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)

  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts?limit=${limit}&skip=${skip}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])

      const postsData: PostsResponse = await postsResponse.json()
      const usersData: UsersResponse = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])

      const postsData: PostsResponse = await postsResponse.json()
      const usersData: UsersResponse = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  const updatePost = async () => {
    if (!selectedPost) return

    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data: CommentsResponse = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: 0, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  const updateComment = async () => {
    if (!selectedComment) return

    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment.body }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  const openPostDetail = (post: Post) => {
    if (!post) return

    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  const openUserModal = async (user: User | undefined) => {
    if (!user) return

    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
    fetchPosts()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostsFilter
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
            selectedTag={selectedTag}
            onTagChange={handleTagChange}
            tags={tags}
            sortBy={sortBy}
            onSortByChange={handleSortByChange}
            sortOrder={sortOrder}
            onSortOrderChange={handleSortOrderChange}
          />

          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onTagSelect={handleTagChange}
              onPostDetail={handlePostDetail}
              onPostEdit={handlePostEdit}
              onPostDelete={handlePostDelete}
              onUserDetail={handleUserDetail}
              highlightText={highlightText}
            />
          )}

          <PostsPagination
            skip={skip}
            limit={limit}
            total={total}
            onSkipChange={handleSkipChange}
            onLimitChange={handleLimitChange}
          />
        </div>

        <PostDetailDialog
          open={showPostDetailDialog}
          onOpenChange={setShowPostDetailDialog}
          post={selectedPost}
          comments={comments[selectedPost?.id ?? 0] ?? []}
          searchQuery={searchQuery}
          onAddComment={() => setShowAddCommentDialog(true)}
          onCommentLike={handleCommentLike}
          onCommentEdit={handleCommentEdit}
          onCommentDelete={handleCommentDelete}
          highlightText={highlightText}
        />

        <PostEditDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          post={selectedPost}
          onUpdate={handlePostUpdate}
        />

        <CommentEditDialog
          open={showEditCommentDialog}
          onOpenChange={setShowEditCommentDialog}
          comment={selectedComment}
          onUpdate={handleCommentUpdate}
        />

        <UserDetailDialog open={showUserModal} onOpenChange={setShowUserModal} user={selectedUser} />
      </CardContent>
    </Card>
  )
}

export default PostsManagerPage
