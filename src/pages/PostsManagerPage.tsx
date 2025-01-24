import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
} from "../shared/ui"
import UserDialog from "../entities/user/ui/UserDialog"
import { useGetTags } from "../entities/tag/api/useGetTag"
import { useUserDialog } from "../entities/user/model/useUserDialog"
import { useDeletePost } from "../entities/post/api/useDeletePost"
import { highlightText } from "../shared/lib/highlightText"
import { usePostDetail } from "../entities/post/model/usePostDetail"
import { PostDetailDialog } from "../entities/post/ui/PostDetailDialog"
import { PostAddDialog } from "../entities/post/ui/PostAddDialog"
import { useAddPost } from "../entities/post/model/useAddPost"
import { useEditPost } from "../entities/post/model/useEditPost"
import { PostEditDialog } from "../entities/post/ui/PostEditDialog"
import { useAddComment } from "../entities/comment/model/useAddComment"
import { CommentAddDialog } from "../entities/comment/ui/CommentAddDialog"
import { useEditComment } from "../entities/comment/model/useEditComment"
import { CommentEditDialog } from "../entities/comment/ui/CommentEditDialog"
import { useDeleteComment } from "../entities/comment/api/useDeleteComment"
import { useLikeComment } from "../entities/comment/api/useUpdateLikeComment"
import { CommentList } from "../entities/comment/ui/CommentList"
import { Post } from "../entities/post/model/types"
import { PostResponse, UserResponse } from "../entities/post/api/useGetPostList"
import { Comment } from "../entities/comment/model/types"
import { User } from "../entities/user/model/types"

interface PostWithAuthor extends Post {
  author?: User
}

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState<string>(queryParams.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get("tag") || "")

  // Posts state
  const [posts, setPosts] = useState<PostWithAuthor[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    isOpen: isOpenPostDetail,
    handleDialog: handlePostDetail,
    handleClose: handleClosePostDetail,
    post,
    comments,
  } = usePostDetail()
  const {
    isOpen: isOpenEditPost,
    post: editPost,
    handleOpen: handleEditPost,
    handleClose: handleCloseEditPost,
    handleChange: handleChangeEditPost,
    handleSubmit: handleSubmitEditPost,
  } = useEditPost()
  const {
    isOpen: isOpenAddPost,
    handleOpen: handleAddPost,
    handleClose: handleCloseAddPost,
    newPost,
    handleChange: handleChangeAddPost,
    handleSubmit: handleSubmitAddPost,
  } = useAddPost()
  const { mutate: deletePost } = useDeletePost()

  // Tags state
  const { data: tags = [] } = useGetTags()

  // Comments state
  const {
    isOpen: isOpenAddComment,
    handleOpen: handleOpenAddComment,
    handleClose: handleCloseAddComment,
    newComment,
    handleSubmit: handleSubmitAddComment,
    handleChange: handleChangeAddComment,
  } = useAddComment()
  const {
    isOpen: isOpenEditComment,
    selectedComment,
    handleOpen: handleOpenEditComment,
    handleClose: handleCloseEditComment,
    handleSubmit: handleSubmitEditComment,
    handleChange: handleChangeEditComment,
  } = useEditComment()
  const { mutate: deleteComment } = useDeleteComment()
  const { mutate: updateLikeComment } = useLikeComment()

  //user
  const { isOpen, handleClose: handleCloseUserDialog, user, handleDialog: handleUserDialog } = useUserDialog()

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
      const postsResponse = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      const postsData: PostResponse = await postsResponse.json()

      const usersResponse = await fetch("/api/users?limit=0&select=username,image")
      const usersData: UserResponse = await usersResponse.json()

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

  // 게시물 검색
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

  // 태그별 게시물 가져오기
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
      const postsData = (await postsResponse.json()) as PostResponse
      const usersData = (await usersResponse.json()) as UserResponse

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

  const handleDeletePost = (postId: number) => {
    deletePost(postId)
  }

  const handleDeleteComment = (comment: Comment, postId: number) => {
    deleteComment({ id: comment.id, postId })
  }

  const handleLikeButton = (comment: Comment, postId: number) => {
    updateLikeComment({ id: comment.id, postId })
  }

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

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleUserDialog(post.author!.id)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handlePostDetail(post.id)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={handleAddPost}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value)
                fetchPostsByTag(value)
                updateURL()
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog
        open={isOpenAddPost}
        onClose={handleCloseAddPost}
        newPost={newPost}
        handleChange={handleChangeAddPost}
        handleSubmit={handleSubmitAddPost}
      />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog
        open={isOpenEditPost}
        onClose={handleCloseEditPost}
        editPost={editPost}
        handleChange={handleChangeEditPost}
        handleSubmit={handleSubmitEditPost}
      />

      {/* 댓글 추가 대화상자 */}
      {post && (
        <CommentAddDialog
          open={isOpenAddComment}
          onClose={handleCloseAddComment}
          newComment={newComment}
          postId={post.id}
          handleSubmit={handleSubmitAddComment}
          handleChange={handleChangeAddComment}
        />
      )}

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog
        open={isOpenEditComment}
        onClose={handleCloseEditComment}
        selectedComment={selectedComment}
        handleSubmit={handleSubmitEditComment}
        handleChange={handleChangeEditComment}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        open={isOpenPostDetail}
        onClose={handleClosePostDetail}
        post={post}
        renderComments={(postId) => (
          <CommentList
            comments={comments || []}
            postId={postId}
            searchQuery={searchQuery}
            handleClickAddButton={handleOpenAddComment}
            handleClickEditButton={(comment) => handleOpenEditComment(comment)}
            handleClickDeleteButton={(comment) => handleDeleteComment(comment, postId)}
            handleClickLikeButton={(comment, postId) => handleLikeButton(comment, postId)}
          />
        )}
      />

      {/* 사용자 다이얼로그 */}
      {user && <UserDialog open={isOpen} onClose={handleCloseUserDialog} user={user} />}
    </Card>
  )
}

export default PostsManager
