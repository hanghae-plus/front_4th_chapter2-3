import { useQuery } from "@tanstack/react-query"

import { fetchTags } from "../../api/fetchTags"

import type { Tag } from "../types/tag"

export const getTagsQueryKeys = {
  all: ["fetchTags"],
}

export const useQueryGetTags = () => {
  return useQuery({
    queryKey: getTagsQueryKeys.all,
    queryFn: async () => fetcher(),
  })
}

const fetcher = async (): Promise<Tag[] | undefined> => {
  try {
    const data = await fetchTags()

    if (!data) return

    return data
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}
