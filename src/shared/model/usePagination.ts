import { useEffect, useState } from "react"

const usePagination = (initTotal: number) => {
  const queryParams = new URLSearchParams(location.search)

  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [total, setTotal] = useState(initTotal)

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
  return { skip, limit, total, setTotal, nextPage, prevPage, updateLimit }
}

export { usePagination }
