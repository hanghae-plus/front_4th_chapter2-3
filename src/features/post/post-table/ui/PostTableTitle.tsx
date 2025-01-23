import { Post } from "@/entities/post/model/types"
import { PostTags } from "@/entities/post/ui/PostTags"
import { TableCell } from "@/shared/ui"
import HighlightText from "@/shared/ui/HighlightText"
import { usePostUrlStore } from "../../post-url/model"

interface PostTableTitleProps {
  post: Post
}

export const PostTableTitle = ({ post }: PostTableTitleProps) => {
  const { searchQuery, selectedTag, setSelectedTag, updateURL } = usePostUrlStore()

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
