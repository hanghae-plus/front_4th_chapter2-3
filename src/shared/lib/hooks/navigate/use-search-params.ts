import { useLocation, useNavigate } from "react-router-dom"

export const useQueryParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const updateURLParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(location.search)

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key)
      } else {
        newParams.set(key, value)
      }
    })

    navigate(`?${newParams.toString()}`)
  }

  return { updateURLParams }
}
