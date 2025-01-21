import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "../api/tagsApi.ts"
import { atom } from "jotai"
const queryParams = new URLSearchParams(location.search)
export const selectedTagAtom = atom<any>(queryParams.get("tag") || "");

export const tagsQueryKey = ['tags'] as const

export const useTagsQuery = () => {
  return useQuery({
    queryKey: tagsQueryKey,
    queryFn: fetchTags,
    initialData: []
  })
}