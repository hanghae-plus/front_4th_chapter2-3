import { useEffect } from "react"
import { useQueryParams } from "../../../shared/model/useQueryParams"

const usePostPagination = () => {
  const { skip, limit, setSkip, setLimit } = useQueryParams()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
  }, [])

  const nextPage = () => {
    setSkip(skip + limit)
  }

  const prevPage = () => {
    setSkip(Math.max(0, skip - limit))
  }

  const updateLimit = (value: string) => {
    setLimit(Number(value))
  }
  return { skip, limit, nextPage, prevPage, updateLimit }
}

export { usePostPagination }
