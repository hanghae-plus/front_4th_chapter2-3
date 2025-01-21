import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shared/ui'
import { Post, User, Comment, Tag, NewComment, NewPost } from '../legacy/models/types'
import { TagListRes } from '../legacy/models/dto.types'
import { getPostTags } from '../legacy/service/post.service'
import { deleteComment, getComments, patchComment, postComment, putComment } from '../legacy/service/comments.service'
import { getUser } from '../legacy/service/user.service'
import { usePost } from '../legacy/hooks/usePost'
import { PostTable } from '../legacy/components/PostTable'
import { AddPostModal } from '../legacy/components/AddPostModal'
import { EditPostModal } from '../legacy/components/EditPostModal'
import { AddCommentModal } from '../legacy/components/AddCommentModal'
import { EditCommentModal } from '../legacy/components/EditCommentModal'
import { PostDetailModal } from '../legacy/components/PostDetailModal'
import { UserModal } from '../legacy/components/UserModal'
import { TagSelect } from '../legacy/components/TagSelect'
import { SortBySelect } from '../legacy/components/SortBySelect'
import { SortOrderSelect } from '../legacy/components/SortOrderSelect'
import { Searchbar } from '../legacy/components/Searchbar'
import { useTagParam } from '../legacy/hooks/useQueryParams'

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [skip, setSkip] = useState(parseInt(queryParams.get('skip') || '0'))
  const [limit, setLimit] = useState(parseInt(queryParams.get('limit') || '10'))
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || '')
  const [sortOrder, setSortOrder] = useState(queryParams.get('sortOrder') || 'asc')
  const [selectedTag, setSelectedTag] = useTagParam()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState<NewPost>({ title: '', body: '', userId: 1 })
  const [tags, setTags] = useState<Tag[]>([])
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({ body: '', postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // 커스텀 hook으로 분리
  // posts가 전체 posts
  const { posts, loading, total, fetchPosts, searchPosts, fetchPostsByTag, updatePost, deletedPost, addPost } = usePost(
    limit,
    skip,
  )

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set('skip', skip.toString())
    if (limit) params.set('limit', limit.toString())
    if (searchQuery) params.set('search', searchQuery)
    if (sortBy) params.set('sortBy', sortBy)
    if (sortOrder) params.set('sortOrder', sortOrder)
    navigate(`?${params.toString()}`)
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const data: TagListRes = await getPostTags()
      setTags(data)
    } catch (error) {
      console.error('태그 가져오기 오류:', error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    try {
      const data = await getComments(postId)
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error('댓글 가져오기 오류:', error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    try {
      const data: Comment = await postComment(newComment)

      setComments((prev) => ({
        ...prev,
        [data.postId as number]: [...(prev[data.postId as number] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: '', postId: null, userId: 1 })
    } catch (error) {
      console.error('댓글 추가 오류:', error)
    }
  }

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      if (!selectedComment) return

      const data: Comment = await putComment(selectedComment)
      setComments((prev) => ({
        ...prev,
        [data.postId as number]: prev[data.postId as number].map((comment) =>
          comment.id === data.id ? data : comment,
        ),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error('댓글 업데이트 오류:', error)
    }
  }

  // 댓글 삭제
  const deletedComment = async (id: number, postId: number) => {
    try {
      await deleteComment(id)

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error('댓글 삭제 오류:', error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const data = await patchComment(id, comments[postId]?.find((c) => c.id === id)?.likes ?? 0 + 1)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (error) {
      console.error('댓글 좋아요 오류:', error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User | undefined) => {
    try {
      if (!user) return
      const userData = await getUser(user.id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error)
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
    setSkip(parseInt(params.get('skip') || '0'))
    setLimit(parseInt(params.get('limit') || '10'))
    setSearchQuery(params.get('search') || '')
    setSortBy(params.get('sortBy') || '')
    setSortOrder(params.get('sortOrder') || 'asc')
    setSelectedTag(params.get('tag') || '')
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
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPosts={searchPosts} />

            <TagSelect
              selectedTag={selectedTag}
              tags={tags}
              onValueChange={(value) => {
                setSelectedTag(value)
                fetchPostsByTag(value)
              }}
            />

            <SortBySelect value={sortBy} onValueChange={setSortBy} />

            <SortOrderSelect value={sortOrder} onValueChange={setSortOrder} />
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              openUserModal={openUserModal}
              openPostDetail={openPostDetail}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
              deletedPost={deletedPost}
            />
          )}

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

      <AddPostModal
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}
      />

      <EditPostModal
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />

      <AddCommentModal
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
      />

      <EditCommentModal
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />

      <PostDetailModal
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        comments={comments}
        searchQuery={searchQuery}
        setNewComment={setNewComment}
        setShowAddCommentDialog={setShowAddCommentDialog}
        setSelectedComment={setSelectedComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
        deletedComment={deletedComment}
        likeComment={likeComment}
      />

      <UserModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />
    </Card>
  )
}

export default PostsManager
