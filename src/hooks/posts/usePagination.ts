import { useState, useEffect } from "react"

export const usePagination = (onPageChange: (skip: number, limit: number) => void) => {
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(10)

  const handleSkipChange = (value: number) => {
    setSkip(value)
    onPageChange(value, limit)
  }

  const handleLimitChange = (value: number) => {
    setLimit(value)
    setSkip(0)
    onPageChange(0, value)
  }

  return {
    skip,
    limit,
    handleSkipChange,
    handleLimitChange,
  }
}
