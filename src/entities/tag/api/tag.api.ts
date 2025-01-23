import { useQuery } from "@tanstack/react-query"

export const useTagsQuery = () =>
  useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/posts/tags")
        return await response.json()
      } catch (error) {
        throw new Error(`태그 가져오기 오류: ${error}`)
      }
    },
  })
