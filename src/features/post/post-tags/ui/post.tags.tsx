import { Post } from "@/entities/posts"
import { useSearchParams } from "@/shared/hooks/use-search-params"

interface PostTagsProps {
  post: Post
}

function PostTags(props: PostTagsProps) {
  const { post } = props
  const { getParam, setParam } = useSearchParams()
  const selectedTag = getParam("tag")

  const handleTagClick = (tag: string) => {
    setParam("tag", tag)
  }

  return (
    <div className="flex flex-wrap gap-1">
      {post?.tags?.map((tag) => (
        <span
          key={tag}
          className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
            selectedTag?.toLowerCase() === tag.toLowerCase()
              ? "text-white bg-blue-500 hover:bg-blue-600"
              : "text-blue-800 bg-blue-100 hover:bg-blue-200"
          }`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export { PostTags }
