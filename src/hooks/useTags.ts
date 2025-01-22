import { getTags } from "../api/tag"
import { useQuery } from "@tanstack/react-query"

export const useTags = () => {
  const { data: tags, error, isLoading } = useQuery({ queryKey: ["tags"], queryFn: getTags })

  return {
    tags,
    error,
    isLoading,
  }
}
