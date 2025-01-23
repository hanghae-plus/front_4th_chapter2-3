import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../shared/ui"
import { CreatePost, Post } from "../../entities/post/model/types"
import { Comment, NewComment } from "../../entities/comment/model/types"
import { User } from "../../entities/user/model/types"
import { postApi } from "../../entities/post/api/postApi"
import { userApi } from "@/entities/user/api/userApi"
import { commentApi } from "@/entities/comment/api/commentApi"
import { INITIAL_NEW_POST_STATE } from "@/entities/post/model/constants"
import { INITIAL_NEW_COMMENT_STATE } from "@/entities/comment/model/constants"
import { usePost } from "@/features/post/model/store"
import { PostTable } from "@/widgets/post/ui/PostTable"
import { PostPagination } from "@/widgets/post/ui/PostPagination"
import { PostTableFilter } from "@/widgets/post/ui/PostTableFilter"
import { PostAddDialog } from "@/widgets/post/ui/PostAddDialog"
import { PostEditDialog } from "@/widgets/post/ui/PostEditDialog"
import { CommentAddDialog } from "@/widgets/comment/ui/CommentAddDialog"
import { CommentEditDialog } from "@/widgets/comment/ui/CommentEditDialog"
import { PostDetailDialog } from "@/widgets/post/ui/PostDetailDialog"
import { UserDialog } from "@/widgets/user/ui/UserDialog"
import { usePostUrl } from "@/features/post/post-url/model"

const PostsManager = () => {
  // 상태 관리
  const [selectedPost, setSelectedPost] = useState<Post>()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState<CreatePost>(INITIAL_NEW_POST_STATE)
  const [comments, setComments] = useState<Record<number, Comment[] | []>>({})
  const [selectedComment, setSelectedComment] = useState<Comment>()
  const [newComment, setNewComment] = useState<NewComment>(INITIAL_NEW_COMMENT_STATE)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // 전역 상태 관리
  const { posts, total, loading, setPosts, setTotal, setLoading, fetchPosts, fetchPostsByTag } = usePost()

  const {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
    updateURL,
  } = usePostUrl()

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await postApi.getSearchPosts({ q: searchQuery })
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await postApi.postAddPost(newPost)

      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost(INITIAL_NEW_POST_STATE)
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    if (!selectedPost) {
      console.error("선택된 게시물이 없습니다.")
      return
    }

    try {
      const data = await postApi.putUpdatePost(selectedPost.id, selectedPost)

      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: Post["id"]) => {
    try {
      await postApi.deletePost(id)

      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId: Post["id"]) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await commentApi.getComments(postId)

      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await commentApi.addComment(newComment)

      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment(INITIAL_NEW_COMMENT_STATE)
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment) {
      throw new Error("선택된 댓글이 없습니다.")
    }

    try {
      const data = await commentApi.updateComment(selectedComment.id, { body: selectedComment.body })

      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: Comment["id"], postId: Comment["postId"]) => {
    try {
      await commentApi.removeComment(id)

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: Comment["id"], postId: Comment["postId"]) => {
    try {
      const matchComment = comments[postId].find((c) => c.id === id)

      if (!matchComment) {
        throw new Error("댓글이 없습니다.")
      }

      const data = await commentApi.likeComment(id, { likes: matchComment.likes + 1 })

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: Partial<User>) => {
    try {
      const userData = await userApi.getUser(user.id!)

      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  // useEffect(() => {
  //   if (selectedTag) {
  //     fetchPostsByTag(selectedTag)
  //   } else {
  //     fetchPosts()
  //   }
  //   updateURL()
  // }, [skip, limit, sortBy, sortOrder, selectedTag])

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search)
  //   setSkip(parseInt(params.get("skip") || "0"))
  //   setLimit(parseInt(params.get("limit") || "10"))
  //   setSearchQuery(params.get("search") || "")
  //   setSortBy(params.get("sortBy") || "")
  //   setSortOrder(params.get("sortOrder") || "asc")
  //   setSelectedTag(params.get("tag") || "")
  // }, [location.search])

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
          <PostTableFilter
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSearchQuery={setSearchQuery}
            searchPosts={searchPosts}
            setSelectedTag={setSelectedTag}
            fetchPostsByTag={fetchPostsByTag}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            updateURL={updateURL}
          />

          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              openUserModal={openUserModal}
              openPostDetail={openPostDetail}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
              deletePost={deletePost}
            />
          )}

          <PostPagination limit={limit} skip={skip} total={total} setLimit={setLimit} setSkip={setSkip} />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}
      />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
      />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog
        selectedComment={selectedComment}
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        postId={selectedPost?.id || 0}
        selectedPost={selectedPost!}
        comments={comments}
        searchQuery={searchQuery}
        setSelectedComment={setSelectedComment}
        likeComment={likeComment}
        deleteComment={deleteComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
        setNewComment={setNewComment}
        setShowAddCommentDialog={setShowAddCommentDialog}
      />

      {/* 사용자 모달 */}
      <UserDialog selectedUser={selectedUser} open={showUserModal} onOpenChange={setShowUserModal} />
    </Card>
  )
}

export default PostsManager
