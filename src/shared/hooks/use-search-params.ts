import { useLocation, useNavigate } from "react-router-dom"

interface UseSearchParamsResult {
  searchParams: URLSearchParams
  setParam: (key: string, value: string) => void
  getParam: (key: string) => string | null
  removeParam: (key: string) => void
  setParams: (params: Record<string, string>) => void
}

function useSearchParams(): UseSearchParamsResult {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)

  const setParam = (key: string, value: string) => {
    searchParams.set(key, value)
    navigate(`?${searchParams.toString()}`, { replace: true })
  }

  const getParam = (key: string) => {
    return searchParams.get(key)
  }

  const removeParam = (key: string) => {
    searchParams.delete(key)
    navigate(`?${searchParams.toString()}`, { replace: true })
  }

  const setParams = (params: Record<string, string>) => {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value)
    })
    navigate(`?${searchParams.toString()}`, { replace: true })
  }

  return {
    searchParams,
    setParam,
    getParam,
    removeParam,
    setParams,
  }
}

export { useSearchParams }
