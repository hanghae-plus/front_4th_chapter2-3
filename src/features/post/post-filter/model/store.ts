import { postApi } from "@/entities/post/api/postApi"
import { Tag } from "@/entities/post/model/types"
import { create } from "zustand"
import { usePost } from "../../model/store"
import { usePostUrlStore } from "../../post-url/model"

interface usePostFilterProps {
  tags: Tag[]
  fetchTags: () => void
  onChangeTag: (value: string) => void
}

export const usePostFilter = create<usePostFilterProps>((set) => {
  const fetchPostsByTag = usePost.getState().fetchPostsByTag
  const setSelectedTag = usePostUrlStore.getState().setSelectedTag

  return {
    tags: [],

    fetchTags: async () => {
      try {
        const data = await postApi.getTags()
        set({ tags: data })
      } catch (e) {
        console.error("태그 가져오기 오류:", e)
      }
    },

    onChangeTag: (value: string) => {
      setSelectedTag(value)
      fetchPostsByTag(value)
    },
  }
})
