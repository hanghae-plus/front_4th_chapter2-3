import { useEffect, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface URLParamsConfig<T extends Record<string, string | number>> {
  params: T
  setters: {
    [K in keyof T]: (value: T[K]) => void
  }
  defaults?: Partial<T>
}

export const useURLParams = <T extends Record<string, string | number>>(config: URLParamsConfig<T>) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { params, setters, defaults = {} } = config

  // URL 파라미터 -> 상태 동기화
  const syncFromURL = useCallback(() => {
    const urlParams = new URLSearchParams(location.search)
    type Keys = keyof typeof params
    ;(Object.keys(params) as Keys[]).forEach((key: Keys) => {
      const value = urlParams.get(key as string)
      const defaultValue = (defaults as T)[key]
      const currentParam = params[key]

      if (typeof currentParam === "number") {
        const numberValue = value ? Number(value) : ((defaultValue as number) ?? 0)
        setters[key](numberValue as T[Keys])
      } else {
        const stringValue = value ?? (defaultValue as string) ?? ""
        setters[key](stringValue as T[Keys])
      }
    })
  }, [location.search, params, setters, defaults])

  // 상태 -> URL 동기화
  const updateURL = useCallback(() => {
    const urlParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        urlParams.set(key, String(value))
      }
    })
    navigate(`?${urlParams.toString()}`)
  }, [params, navigate])

  // URL 변경 시 상태 업데이트
  useEffect(() => {
    syncFromURL()
  }, [syncFromURL])

  // 상태 변경 시 URL 업데이트
  useEffect(() => {
    updateURL()
  }, [updateURL])

  return { updateURL }
}
