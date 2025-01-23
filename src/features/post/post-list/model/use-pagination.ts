import { useSearchParams } from "@/shared/hooks/use-search-params"

interface UsePaginationProps {
  initialTotal: number
}

export function usePagination(props: UsePaginationProps) {
  const { initialTotal } = props

  const { getParam, setParam } = useSearchParams()

  const skip = parseInt(getParam("skip") || "0")
  const limit = parseInt(getParam("limit") || "10")

  const total = initialTotal || 0

  const handleSkipChange = (newSkip: number) => {
    setParam("skip", newSkip.toString())
  }

  const handleLimitChange = (newLimit: number) => {
    setParam("limit", newLimit.toString())
  }

  return {
    skip,
    limit,
    total,
    handleSkipChange,
    handleLimitChange,
  }
}
