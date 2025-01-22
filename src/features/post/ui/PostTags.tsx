import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostTagsProps {
  post: PostWithUser
  selectedTag: string
  setSelectedTag: (tag: string) => void
  updateURL: () => void
}

export const PostTags = ({ post, selectedTag, setSelectedTag, updateURL }: PostTagsProps) => {
  return (
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
  )
}
