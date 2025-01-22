import { Select } from "../../../shared/ui"

import type { Tag } from "../../../entities/tag/model/types/tag"

interface TagSelectProps {
  tags: Tag[]
  selectedTag: string
  setSelectedTag: (tag: string) => void
  updateURL: () => void
}

export const TagSelect = ({ tags, selectedTag, setSelectedTag, updateURL }: TagSelectProps) => {
  // const fetchPostsByTag = async (tag) => {
  //   if (!tag || tag === "all") {
  //     fetchPosts()
  //     return
  //   }
  //   setLoading(true)
  //   try {
  //     const [postsResponse, usersResponse] = await Promise.all([
  //       fetch(`/api/posts/tag/${tag}`),
  //       fetch("/api/users?limit=0&select=username,image"),
  //     ])
  //     const postsData = await postsResponse.json()
  //     const usersData = await usersResponse.json()

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

  const fetchPostsByTag = (tag: string) => {}

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        fetchPostsByTag(value)
        updateURL()
      }}
    >
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder="태그 선택" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="all">모든 태그</Select.Item>
        {tags.map((tag) => (
          <Select.Item key={tag.url} value={tag.slug}>
            {tag.slug}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  )
}
