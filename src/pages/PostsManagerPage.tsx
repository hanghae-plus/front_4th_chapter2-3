import { useState } from 'react'
import { Plus } from 'lucide-react'
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
import { Post, User, Comment, NewComment } from '../legacy/models/types'
import { putComment } from '../legacy/service/comments.service'
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
import { SearchPostInput } from '../legacy/components/Searchbar'
import { useLimitParam, useSkipParam, useSortByParam, useSortOrderParam } from '../legacy/hooks/useQueryParams'

const PostsManager = () => {
  // searchParams 관리
  const [skip, setSkip] = useSkipParam()
  const [limit, setLimit] = useLimitParam()
  const [sortBy, setSortBy] = useSortByParam()
  const [sortOrder, setSortOrder] = useSortOrderParam()

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)

  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({ body: '', postId: null, userId: 1 })

  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // 커스텀 hook으로 분리
  // posts가 전체 posts
  const { posts, loading, total } = usePost()

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

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
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
            <SearchPostInput />

            <TagSelect />

            <SortBySelect value={sortBy} onValueChange={setSortBy} />

            <SortOrderSelect value={sortOrder} onValueChange={setSortOrder} />
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              openUserModal={openUserModal}
              openPostDetail={openPostDetail}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
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

      <AddPostModal showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} />

      <EditPostModal
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />

      <AddCommentModal
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        selectedPostId={selectedPost?.id ?? 0}
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
        setNewComment={setNewComment}
        setShowAddCommentDialog={setShowAddCommentDialog}
        setSelectedComment={setSelectedComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
      />

      <UserModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={selectedUser} />
    </Card>
  )
}

export default PostsManager
