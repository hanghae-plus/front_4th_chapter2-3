import { useEffect } from "react"
import { usePostFilterStore } from "./store"

export const usePostFilterTags = () => {
  const { tags, selectedTag, fetchTags, onChangeTag } = usePostFilterStore()

  useEffect(() => {
    fetchTags()
  }, [])

  return {
    tags,
    selectedTag,
    onChangeTag,
  }
}
