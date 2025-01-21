import { Post } from "@/entities/post/model/types"
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
  return (
    <TableCell>
      <div className="space-y-1">
        <div>
          <HighlightText text={post.title} highlight={searchQuery} />
        </div>

        <div className="flex flex-wrap gap-1">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                selectedTag === tag
                  ? "text-white bg-blue-500 hover:bg-blue-600"
                  : "text-blue-800 bg-blue-100 hover:bg-blue-200"
              }`}
              onClick={() => {
                setSelectedTag(tag)
                updateURL()
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TableCell>
  )
}
