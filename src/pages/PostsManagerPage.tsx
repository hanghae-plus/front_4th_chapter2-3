import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Card,
} from "../shared/ui"
import SearchInput from "../features/search/ui/SearchInput.tsx"
import { useAtom, useSetAtom } from "jotai"
import {
  newPostsAtom,
  postsAtom,
  selectedPostsAtom,
  selectedUserAtom,
  totalAtom,
} from "../features/posts/model/store.ts"
import { searchQueryAtom } from "../features/search/model/store.ts"
import SelectTag from "../features/tag/ui/SelectTag.tsx"
import { limitAtom, skipAtom } from "../modules/model/store.ts"
import { sortByAtom, sortOrderAtom } from "../features/sort/model/store.ts"
import updateSearchParams from "../modules/model/updateSearchParams.ts"
import usePosts from "../features/posts/model/actions.ts"
import SelectSort from "../features/sort/ui/SelectSort.tsx"
import SelectSortBy from "../features/sort/ui/SelectSortBy.tsx"
import { isLoadingAtom } from "../shared/model/store.ts"
import {
  showAddCommentDialogAtom, showAddDialogAtom,
  showEditCommentDialogAtom, showEditDialogAtom,
  showPostDetailDialogAtom, showUserModalAtom,
} from "../entities/modal/model/store.ts"
import { selectedTagAtom } from "../features/tag/model/store.ts"
import { commentsAtom, newCommentAtom, selectedCommentAtom } from "../entities/comment/model/store.ts"
import RenderPostTable from "../features/posts/ui/RenderPostTable.tsx"
import RenderComments from "../features/comments/ui/RenderComments.tsx"
import { highlightText } from "../features/posts/lib/highlightText.tsx"
import PostAddModal from "../features/posts/ui/PostAddModal.tsx"
import EditPostModal from "../features/posts/ui/EditPostModal.tsx"
import AddCommentModal from "../features/comments/ui/AddCommentModal.tsx"
import EditCommentModal from "../features/comments/ui/EditCommentModal.tsx"
import DetailPostModal from "../features/posts/ui/DetailPostModal.tsx"
import DetailUserModal from "../features/posts/ui/DetailUserModal.tsx"
import Pagination from "../modules/post/ui/Pagination.tsx"
import PostHeader from "../modules/post/ui/PostHeader.tsx"
import PostLayout from "../modules/post/ui/PostLayout.tsx"

const PostsManager = () => {
  const location = useLocation()
  // 상태 관리

  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);

  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  
  // const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const setSearchQuery = useSetAtom(searchQueryAtom);
  //(사용) URL 업데이트 함수
  const {updateURL} = updateSearchParams();
  const {fetchPosts, fetchPostsByTag} = usePosts();

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  // 이건 그대로 두기
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
      <PostHeader />
      <PostLayout>
        <RenderPostTable />
      </PostLayout>
      
      {/* 모달 */}
      <PostAddModal />
      <EditPostModal />
      <AddCommentModal />
      <EditCommentModal />
      <DetailPostModal />
      <DetailUserModal />
    </Card>
  )
}

export default PostsManager
