import { useEffect } from "react"
import { usePostFilter } from "./store"

export const usePostFilterTags = () => {
  const { tags, selectedTag, fetchTags, onChangeTag } = usePostFilter()

  useEffect(() => {
    fetchTags()
  }, [])

  return {
    tags,
    selectedTag,
    onChangeTag
  }
}