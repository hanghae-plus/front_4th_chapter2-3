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
} from "../features/posts/model/postsStore.ts"
import { searchQueryAtom } from "../features/search/model/searchQueryStore.ts"
import SelectTag from "../features/tag/ui/SelectTag.tsx"
import { limitAtom, skipAtom } from "../modules/search/model/store.ts"
import { sortByAtom, sortOrderAtom } from "../features/sort/model/sortStores.ts"
import updateSearchParams from "../modules/search/model/updateSearchParams.ts"
import usePosts from "../features/posts/model/usePostsQuery.ts"
import SelectSort from "../features/sort/ui/SelectSort.tsx"
import SelectSortBy from "../features/sort/ui/SelectSortBy.tsx"
import { isLoadingAtom } from "../shared/model/store.ts"
import {
  showAddCommentDialogAtom, showAddDialogAtom,
  showEditCommentDialogAtom, showEditDialogAtom,
  showPostDetailDialogAtom, showUserModalAtom,
} from "../entities/modal/model/modalOpenerStore.ts"
import { selectedTagAtom } from "../features/tag/model/tagStores.ts"
import { commentsAtom, newCommentAtom, selectedCommentAtom } from "../entities/comment/model/commentStore.ts"
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
