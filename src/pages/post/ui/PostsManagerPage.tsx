import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Plus } from "lucide-react"
import { useStore } from "../../../app/store"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui"
import { fetchTags, fetchPostsByTag, fetchPosts } from "../../../features/post/api"
import { useUpdateURL } from "../../../shared/api"
import { AddPostDialog, EditPostDialog, ViewPostDialog } from "../../../widgets/post/ui"
import { EditCommentDialog, AddCommentDialog } from "../../../widgets/dialog/ui"
import { ControlContainer } from "../../../widgets/general/ui"
import { UserModalDialog } from "../../../widgets/user/ui/UserModalDialog"

const PostsManager = () => {
  const location = useLocation()
  const updateURL = useUpdateURL()

  // 상태 관리
  const {
    skip,
    limit,
    sortBy,
    sortOrder,
    selectedTag,
    setTags,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setShowAddDialog,
    setSelectedTag,
  } = useStore()

  useEffect(() => {
    fetchTags(setTags)
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
        <ControlContainer />
      </CardContent>
      <AddPostDialog />
      <EditPostDialog />
      <AddCommentDialog />
      <EditCommentDialog />
      <ViewPostDialog />
      <UserModalDialog />
    </Card>
  )
}

export default PostsManager
