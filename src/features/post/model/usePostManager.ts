import { useEffect, useState } from "react"
import { useDialogStore } from "../../../shared/model/useDialogStore"
import { Tag } from "../../../entities/post/model/types"
import { usePostsFilter } from "./usePostFilter"
import { usePostActions } from "./usePostActions"

export const usePostsManager = () => {
  const { setShowAddDialog } = useDialogStore()
  const [tags, setTags] = useState<Tag[]>([])
  const { updateURL, sortBy, sortOrder, selectedTag } = usePostsFilter()
  const { isLoading } = usePostActions()

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
      console.log("태그:", data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    updateURL()
  }, [sortBy, sortOrder, selectedTag])

  useEffect(() => {
    fetchTags()
  }, [])

  return {
    tags,
    isLoading,
    setShowAddDialog,
  }
}
