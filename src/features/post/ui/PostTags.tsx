import { usePageParamActions, useSelectedTag } from "../../../entities/tag/model/store/PageParamProvider"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostTagsProps {
  post: PostWithUser
}

export const PostTags = ({ post }: PostTagsProps) => {
  const selectedTag = useSelectedTag()
  const actions = usePageParamActions()

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
            actions.setSelectedTag(tag)
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
