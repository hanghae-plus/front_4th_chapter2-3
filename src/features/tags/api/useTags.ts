import { getTags } from "../../../entities/tag/api/index"
import { useQuery } from "@tanstack/react-query"

export const useTags = () => {
  const { data: tags, error, isLoading } = useQuery({ queryKey: ["tags"], queryFn: getTags })

  return {
    tags,
    error,
    loading: isLoading,
  }
}
