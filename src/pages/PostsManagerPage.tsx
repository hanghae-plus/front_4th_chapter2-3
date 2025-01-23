import { useState } from "react"
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
import { usePosts } from "../hooks/usePosts"
import { Post } from "../types/post"
import { User } from "../types/user"
import { Comment } from "../types/comment"
import { useDialogStore } from "../store/dialog"
import { useInitUpdateURL, useSyncParamsWithURL } from "../store/params"

const PostsManager = () => {
  useSyncParamsWithURL()
  useInitUpdateURL()

  const { onOpenChange } = useDialogStore()

  const { loading } = usePosts()

  // ! 얘도 따로 관리해야하나? 흠...
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => onOpenChange("addPostDialog", true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FilterableSearch />
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable onSelectPost={setSelectedPost} onSelectUser={setSelectedUser} />
          )}
          <Pagination />
        </div>
      </CardContent>
      <PostAddDialog />
      {selectedPost && <PostUpdateDialog selectedPost={selectedPost} onSelectPost={setSelectedPost} />}
      {selectedPost && <CommentAddDialog postId={selectedPost?.id} />}
      {selectedPost && selectedComment && (
        <CommentUpdateDialog
          postId={selectedPost?.id}
          selectedComment={selectedComment}
          onSelectComment={setSelectedComment}
        />
      )}
      {selectedPost && <PostDetailDialog selectedPost={selectedPost} onSelectComment={setSelectedComment} />}
      <UserModal selectedUser={selectedUser} />
    </Card>
  )
}

export default PostsManager

// todo: hooks로 분리할 수 있는 거 다 분리
// todo: 위에서 분리한 거 전역 상태로 끌어올리기
// todo: tanstack + typescript 제대로 적용
// todo: 에러 제거(테스트 + 컴파일)
// todo: fsd식 파일 분리
// ! 전역 상태 훅은 최상위에서만? 필요한 곳에 전부? (컴포넌트는 필요한 곳에서 전부. 그렇다면 훅은?)
