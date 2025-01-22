import { postApi } from "@/entities/post/api/postApi"
import { Tag } from "@/entities/post/model/types"
import { create } from "zustand"
import { usePost } from "../../model/store"

interface usePostFilterProps {
  tags: Tag[]
  selectedTag: string
  setSelectedTag: (tag: string) => void
  fetchTags: () => void
  onChangeTag: (value: string) => void
}

export const usePostFilter = create<usePostFilterProps>((set) => {
  const fetchPostsByTag = usePost.getState().fetchPostsByTag
  return {
    tags: [],
    selectedTag: "",
    setSelectedTag: (tag: string) => set({ selectedTag: tag }),

    fetchTags: async () => {
      try {
        const data = await postApi.getTags()
        set({ tags: data })
      } catch (e) {
        console.error("태그 가져오기 오류:", e)
      }
    },

    onChangeTag: (value: string) => {
      set({ selectedTag: value })
      fetchPostsByTag(value)
    },
  }
})
