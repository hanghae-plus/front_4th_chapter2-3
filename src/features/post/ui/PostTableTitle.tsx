import { Post } from "@/entities/post/model/types"
import { PostTags } from "@/entities/post/ui/PostTags"
import { TableCell } from "@/shared/ui"
import HighlightText from "@/widgets/ui/HighlightText"

interface PostTableTitleProps {
  post: Post
  searchQuery: string
  selectedTag: string
  setSelectedTag: (tag: string) => void
  updateURL: () => void
}

export const PostTableTitle = ({ post, searchQuery, selectedTag, setSelectedTag, updateURL }: PostTableTitleProps) => {
  // 태그 선택
  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag)
    updateURL()
  }

  return (
    <TableCell>
      <div className="space-y-1">
        <div>
          <HighlightText text={post.title} highlight={searchQuery} />
        </div>
        <PostTags post={post} selectedTag={selectedTag} onTagClick={handleSelectTag} />
      </div>
    </TableCell>
  )
}
