import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui/index"
import { PostTable } from "../components/PostTable"
import { Pagination } from "../components/Pagination"
import { PostAddDialog } from "../components/PostAddDialog"
import { PostUpdateDialog } from "../components/PostUpdateDialog"
import { CommentAddDialog } from "../components/CommentAddDialog"
import { CommentUpdateDialog } from "../components/CommentUpdateDialog"
import { PostDetailDialog } from "../components/PostDetailDialog"
import { UserModal } from "../components/UserModal"
import { FilterableSearch } from "../components/FilterableSearch"
import { getTags } from "../api/tag"
import { usePosts } from "../hooks/usePosts"
import { useParams } from "../hooks/useParams"
import { useTags } from "../hooks/useTags"

const PostsManager = () => {
  // 상태 관리
  const { limit, selectedTag, skip, sortBy, sortOrder, changeLimit, changeSkip } = useParams()
  const { tags } = useTags()
  const { posts, loading, total } = usePosts(selectedTag, skip, limit, sortBy, sortOrder)

  const [selectedPost, setSelectedPost] = useState(null)

  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  const [comments, setComments] = useState({})
  const [selectedComment, setSelectedComment] = useState(null)
  const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)

  const [selectedUser, setSelectedUser] = useState(null)

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
          <FilterableSearch />
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable posts={posts} />}
          <Pagination skip={skip} total={total} limit={limit} onChangeLimit={changeLimit} onChangeSkip={changeSkip} />
        </div>
      </CardContent>
      <PostAddDialog />
      <PostUpdateDialog />
      <CommentAddDialog />
      <CommentUpdateDialog />
      <PostDetailDialog />
      <UserModal />
    </Card>
  )
}

export default PostsManager

// todo: hooks로 분리할 수 있는 거 다 분리
// todo: 위에서 분리한 거 전역 상태로 끌어올리기 - ui 상태는 아마 제외.
// todo: tanstack + typescript 제대로 적용
// todo: fsd식 파일 분리
