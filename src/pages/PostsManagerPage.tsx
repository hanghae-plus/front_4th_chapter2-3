import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// entities
import { User } from "@entities/user/model"
import { Comment } from "@entities/comment/model"
import { Post, PostTag, PostComment } from "@entities/post/model"

// api
import { postsApi } from "@entities/post/api"
import { usersApi } from "@entities/user/api"
import { commentsApi } from "@entities/comment/api"

// widgets
import { PostsManagerWidget, PostDetailDialog, PostFormDialog } from "@widgets/post/ui"
import { CommentFormDialog } from "@widgets/comment/ui"
import { UserInfoDialog } from "@widgets/user/ui"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState<Omit<Post, "id">>({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<PostTag[]>([])
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<PostComment>({
    body: "",
    postId: null,
    userId: 1,
  })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // URL 업데이트 함수
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

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const data = await postsApi.fetchPosts(limit, skip)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await postsApi.searchPosts(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await postsApi.fetchPostsByTag(tag)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await postsApi.addPost(newPost)
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    if (!selectedPost) return
    try {
      const data = await postsApi.updatePost(selectedPost)
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await postsApi.deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const data = await postsApi.fetchTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const commentsList = await commentsApi.fetchCommentsByPostId(postId)
      setComments((prev) => ({ ...prev, [postId]: commentsList }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    if (!newComment.postId) return
    try {
      const data = await commentsApi.addComment({
        body: newComment.body,
        postId: newComment.postId,
        userId: newComment.userId,
      })
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment) return
    try {
      const data = await commentsApi.updateComment(selectedComment.id, selectedComment.body)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId]?.map((comment) => (comment.id === data.id ? data : comment)) || [],
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await commentsApi.deleteComment(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    const comment = comments[postId]?.find((c) => c.id === id)
    if (!comment) return

    try {
      const data = await commentsApi.likeComment(id, comment.likes)
      setComments((prev) => ({
        ...prev,
        [postId]:
          prev[postId]?.map((comment) => (comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment)) ||
          [],
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    if (post.id) {
      fetchComments(post.id)
    }
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User | undefined) => {
    if (!user?.id) return
    try {
      const userData = await usersApi.fetchUserById(user.id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
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
    <>
      <PostsManagerWidget
        loading={loading}
        posts={posts}
        total={total}
        skip={skip}
        limit={limit}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        tags={tags}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onAddClick={() => setShowAddDialog(true)}
        onEditPost={(post) => {
          setSelectedPost(post)
          setShowEditDialog(true)
        }}
        onDeletePost={deletePost}
        onViewComments={openPostDetail}
        onUserClick={openUserModal}
        onSearchChange={setSearchQuery}
        onSearch={searchPosts}
        onTagChange={setSelectedTag}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
        onLimitChange={setLimit}
        onPrevPage={() => setSkip(Math.max(0, skip - limit))}
        onNextPage={() => setSkip(skip + limit)}
      />

      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        post={selectedPost}
        comments={selectedPost ? comments[selectedPost.id] || [] : []}
        onAddComment={() => {
          setNewComment((prev) => ({ ...prev, postId: selectedPost?.id || null }))
          setShowAddCommentDialog(true)
        }}
        onEditComment={(comment) => {
          setSelectedComment(comment)
          setShowEditCommentDialog(true)
        }}
        onDeleteComment={deleteComment}
        onLikeComment={likeComment}
      />

      <PostFormDialog
        mode="add"
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onTitleChange={(title) => setNewPost({ ...newPost, title })}
        onBodyChange={(body) => setNewPost({ ...newPost, body })}
        onSubmit={addPost}
      />

      <PostFormDialog
        mode="edit"
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={selectedPost}
        onTitleChange={(title) => setSelectedPost(selectedPost ? { ...selectedPost, title } : null)}
        onBodyChange={(body) => setSelectedPost(selectedPost ? { ...selectedPost, body } : null)}
        onSubmit={updatePost}
      />

      <CommentFormDialog
        mode="add"
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
        onBodyChange={(body) => setNewComment({ ...newComment, body })}
        onSubmit={addComment}
      />

      <CommentFormDialog
        mode="edit"
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
        comment={selectedComment}
        onBodyChange={(body) => setSelectedComment(selectedComment ? { ...selectedComment, body } : null)}
        onSubmit={updateComment}
      />

      <UserInfoDialog open={showUserModal} onOpenChange={setShowUserModal} user={selectedUser} />
    </>
  )
}

export default PostsManager
