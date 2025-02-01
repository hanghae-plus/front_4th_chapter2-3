import { useNavigate, useLocation } from 'react-router-dom'

// 기본 URL 파라미터 훅
const useUrlParam = <T>(key: string, defaultValue: T) => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const getValue = (): T => {
    const value = params.get(key)
    if (value === null) return defaultValue
    return typeof defaultValue === 'number' ? (Number(value) as T) : (value as T)
  }

  const setValue = (newValue: T) => {
    console.log('🚀 ~ setValue ~ newValue:', newValue)
    const params = new URLSearchParams(location.search)
    if (newValue === '' || newValue === null || newValue === undefined) {
      params.delete(key)
    } else {
      params.set(key, String(newValue))
    }
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    })
  }

  return [getValue(), setValue] as const
}

// 특화된 훅들
export const useSkipParam = () => {
  return useUrlParam('skip', 0)
}

export const useLimitParam = () => {
  return useUrlParam('limit', 10)
}

export const useSearchParam = () => {
  return useUrlParam('search', '')
}

export const useSortByParam = () => {
  return useUrlParam('sortBy', '')
}

export const useSortOrderParam = () => {
  return useUrlParam<'asc' | 'desc'>('sortOrder', 'asc')
}

export const useTagParam = () => {
  return useUrlParam('tag', '')
}
