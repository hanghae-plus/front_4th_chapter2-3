import { Button } from "../../shared/ui"
import { usePostsStore } from "../../stores/usePostsStore"
import { useState } from "react"

export const PostsPagination = () => {
  const { total, fetchPosts, searchQuery, selectedTag, sortBy, sortOrder } = usePostsStore()
  const [skip, setSkip] = useState(0)
  const limit = 10

  const handlePageChange = (newSkip: number) => {
    setSkip(newSkip)
    fetchPosts(newSkip, limit, selectedTag, searchQuery, sortBy, sortOrder)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">총 {total}개의 게시물</div>
      <div className="flex gap-2">
        <Button variant="outline" disabled={skip === 0} onClick={() => handlePageChange(skip - limit)}>
          이전
        </Button>
        <Button variant="outline" disabled={skip + limit >= total} onClick={() => handlePageChange(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
