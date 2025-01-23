import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "../../../api/fetchTags"
import apiClient from "../../../shared/utils/apiClient"
import { Post } from "../types"

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  })
}

export const fetchPosts = async (limit: number, skip: number): Promise<Post[]> => {
  const { data } = await apiClient.get(`/posts?limit=${limit}&skip=${skip}`)
  if (!data) throw new Error("게시물을 가지고 오는 데 실패했습니다 ")
  return data
}
