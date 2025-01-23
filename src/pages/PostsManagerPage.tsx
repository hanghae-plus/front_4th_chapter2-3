import { QueryClient } from "@tanstack/react-query"

import { getPostsQueryKeys, useQueryGetPosts } from "../entities/post/model/queries/useQueryGetPosts"
import { useQueryGetTags } from "../entities/tag/model/hooks/useQueryGetTags"
import { useLimit, useSkip } from "../entities/tag/model/store/PageParamProvider"
import { PostAddDialogOpenButton } from "../features/post/ui/PostAddDialogOpenButton"
import { PostSearchForm } from "../features/post/ui/PostSearchForm"
import { Card } from "../shared/ui"
import { usePageParam } from "./model/hooks/usePageParam"
import { Pagination } from "../widgets/pagination/ui/Pagination"
import { PostTable } from "../widgets/post-table/ui/PostTable"
import { SortBySelect } from "../widgets/sort-by-select/ui/SortBySelect"
import { SortOrderSelect } from "../widgets/sort-order-select/ui/SortOrderSelect"
import { TagSelect } from "../widgets/tag-select/ui/TagSelect"

const PostsManager = () => {
  // 상태 관리
  // const [posts, setPosts] = useState<PostWithUser[]>([])
  // const [total, setTotal] = useState(0)

  const queryClient = new QueryClient()

  const skip = useSkip()
  const limit = useLimit()

  usePageParam()
  const { data, isLoading } = useQueryGetPosts({ limit, skip })
  const { data: tagsData } = useQueryGetTags()

  const posts = data?.posts || []
  const total = data?.total || 0

  const tags = tagsData || []

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

  // Feature
  // useEffect(() => {
  //   if (selectedTag) {
  //     // fetchPostsByTag(selectedTag)
  //   } else {
  //     queryClient.invalidateQueries(getPostsQueryKeys["all"])
  //   }
  //   updateURL()
  // }, [skip, limit, sortBy, sortOrder, selectedTag])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddDialogOpenButton />
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <PostSearchForm />
            <TagSelect tags={tags} />
            <SortBySelect />
            <SortOrderSelect />
          </div>
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable posts={posts} />}
          <Pagination total={total} />
        </div>
      </Card.Content>
    </Card>
  )
}

export default PostsManager
