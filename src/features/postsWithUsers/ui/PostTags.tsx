import { useEffect } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { postsWithUsersAtom } from "@features/postsWithUsers/model"
import { searchQueryAtom, selectedTagAtom } from "@features/searchPost/model"
import { usePostsByTagQuery } from "@features/searchPost/api"
import { highlightText } from "@shared/lib"

import type { PostType } from "@entities/post/model"

interface Props {
  post: PostType
}

export const PostTags = ({ post }: Props) => {
  const setPosts = useSetAtom(postsWithUsersAtom)
  const searchQuery = useAtomValue(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  const { data: postsByTag, isLoading: isPostsByTagQueryLoading } = usePostsByTagQuery(selectedTag)

  useEffect(() => {
    if (!isPostsByTagQueryLoading && postsByTag) {
      setPosts(postsByTag.posts || [])
    }
  }, [selectedTag, postsByTag, isPostsByTagQueryLoading])

  return (
    <div className="space-y-1">
      <div>{highlightText(post.title, searchQuery)}</div>

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
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
