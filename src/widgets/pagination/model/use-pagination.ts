import { useLocation, useNavigate } from "react-router-dom"
import { useMemo } from "react"

export const usePagination = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()

  const skip = useMemo(() => parseInt(queryParams.get("skip") || "0"), [queryParams])
  const limit = useMemo(() => parseInt(queryParams.get("limit") || "10"), [queryParams])

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(location.search)
    newParams.set("skip", String(page * limit))
    navigate(`?${newParams.toString()}`)
  }

  const handlePageSizeChange = (newLimit: number) => {
    const newParams = new URLSearchParams(location.search)
    newParams.set("limit", String(newLimit))
    newParams.set("skip", "0")
    navigate(`?${newParams.toString()}`)
  }

  const currentPage = Math.floor(skip / limit)

  return {
    page: currentPage,
    pageSize: limit,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
  }
}
