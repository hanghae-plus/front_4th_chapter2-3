import { Post } from "../../../types/posts"

// 검색어로 게시물 필터링
export const filterPostsBySearch = (posts: Post[], searchQuery: string): Post[] => {
  if (!searchQuery.trim()) return posts

  const query = searchQuery.toLowerCase()
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(query)),
  )
}

// 태그로 게시물 필터링
export const filterPostsByTag = (posts: Post[], tag: string): Post[] => {
  if (!tag || tag === "all") return posts
  return posts.filter((post) => post.tags?.includes(tag))
}

// 게시물 정렬
export const sortPosts = (posts: Post[], sortBy?: string, sortOrder?: string): Post[] => {
  if (!sortBy || sortBy === "none") return posts

  return [...posts].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "title":
        comparison = a.title.localeCompare(b.title)
        break
      case "likes":
        comparison = (a.reactions?.likes || 0) - (b.reactions?.likes || 0)
        break
      default:
        return 0
    }

    return sortOrder === "desc" ? -comparison : comparison
  })
}
