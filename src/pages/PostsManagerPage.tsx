import { QueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { fetchComments } from "../entities/comment/api/fetchComments"
import { fetchPosts } from "../entities/post/api/fetchPosts"
import { getPostsQueryKeys, useQueryGetPosts } from "../entities/post/model/queries/useQueryGetPosts"
import { fetchTag } from "../entities/tag/api/fetchTag"
import { fetchTags } from "../entities/tag/api/fetchTags"
import { fetchUser } from "../entities/user/api/fetchUser"
import { fetchUsernameAndImageOnly } from "../entities/user/api/fetchUsernameAndImageOnly"
import { PostAddButton } from "../features/post/ui/PostAddButton"
import { PostSearchForm } from "../features/post/ui/PostSearchForm"
import { Card } from "../shared/ui"
import { CommentAddDialog } from "../widgets/comment-add-dialog/ui/CommentAddDialog"
import { CommentEditDialog } from "../widgets/comment-edit-dialog/ui/CommentEditDialog"
import { Pagination } from "../widgets/pagination/ui/Pagination"
import { PostAddDialog } from "../widgets/post-add-dialog/ui/PostAddDialog"
import { PostDetailDialog } from "../widgets/post-detail-dialog/ui/PostDetailDialog"
import { PostEditDialog } from "../widgets/post-edit-dialog/ui/PostEditDialog"
import { PostTable } from "../widgets/post-table/ui/PostTable"
import { SortBySelect } from "../widgets/sort-by-select/ui/SortBySelect"
import { SortOrderSelect } from "../widgets/sort-order-select/ui/SortOrderSelect"
import { TagSelect } from "../widgets/tag-select/ui/TagSelect"
import { UserDialog } from "../widgets/user-dialog/ui/UserDialog"

import type { Comment } from "../entities/comment/model/types/comments"
import type { PostWithUser } from "../entities/post/model/types/post"
import type { User } from "../entities/user/model/types/user"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  // const [posts, setPosts] = useState<PostWithUser[]>([])
  // const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<PostWithUser | null>(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [newComment, setNewComment] = useState({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)

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

  const queryClient = new QueryClient()
  const { data, isLoading } = useQueryGetPosts({ limit, skip })

  const posts = data?.posts || []
  const total = data?.total || 0

  // 태그별 게시물 가져오기
  // Feature
  // const fetchPostsByTag = async (tag: string) => {
  //   if (!tag || tag === "all") {
  //     // getPosts()
  //     return
  //   }

  //   setLoading(true)

  //   try {
  //     const [postsResponse, usersResponse] = await Promise.all([fetchTag(tag), fetchUsernameAndImageOnly()])
  //     const postsData = postsResponse
  //     const usersData = usersResponse

  //     if (!postsData || !usersData) return

  //     const postsWithUsers = postsData.posts.map((post) => ({
  //       ...post,
  //       author: usersData.users.find((user) => user.id === post.userId),
  //     }))

  //     setPosts(postsWithUsers)
  //     setTotal(postsData.total)
  //   } catch (error) {
  //     console.error("태그별 게시물 가져오기 오류:", error)
  //   }
  //   setLoading(false)
  // }

  // 게시물 상세 보기
  // Feature
  // const openPostDetail = (post) => {
  //   setSelectedPost(post)
  //   fetchComments(post.id)
  //   setShowPostDetailDialog(true)
  // }

  // Feature
  useEffect(() => {
    fetchTags()
  }, [])

  // Feature
  useEffect(() => {
    if (selectedTag) {
      // fetchPostsByTag(selectedTag)
    } else {
      queryClient.invalidateQueries(getPostsQueryKeys["all"])
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  // Feature? 뭐야이거
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
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddButton />
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <PostSearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <TagSelect tags={tags} selectedTag={setSelectedTag} updateURL={updateURL} />
            <SortBySelect sortBy={sortBy} setSortBy={setSortBy} />
            <SortOrderSelect sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>

          {/* 게시물 테이블 */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              selectedTag={selectedTag}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination skip={skip} setSkip={setSkip} limit={limit} setLimit={setLimit} total={total} />
        </div>
      </Card.Content>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog open={showAddDialog} onOpenChange={setShowAddDialog} newPost={newPost} setNewPost={setNewPost} />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        selectedPost={selectedPost}
        posts={posts}
        onChangeEditPosts={(posts: any) => setPosts(posts)}
        onShowEditDialog={(open: boolean) => setShowEditDialog(open)}
        onChangeSelectedPost={(args: any) => setSelectedPost(args)}
      />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog
        open={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
      />
    </Card>
  )
}

export default PostsManager
