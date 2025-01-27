import { Post } from "../../../types/posts"

// 게시물 유효성 검사
export const validatePost = (post: Post): boolean => {
  if (!post.title?.trim()) return false
  if (!post.body?.trim()) return false
  if (post.tags?.some((tag) => !tag.trim())) return false
  return true
}

// 태그 유효성 검사 및 정규화
export const normalizeTags = (tags: string[]): string[] => {
  return tags
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0)
    .filter((tag, index, self) => self.indexOf(tag) === index)
}
