type ApiClient = {
  get: <T>(url: string, params?: Record<string, string | number | boolean>, config?: RequestInit) => Promise<T>
  post: <T>(url: string, data?: Record<string, string | number | boolean>, config?: RequestInit) => Promise<T>
  put: <T>(url: string, data?: Record<string, string | number | boolean>, config?: RequestInit) => Promise<T>
  patch: <T>(url: string, data?: Record<string, string | number | boolean>, config?: RequestInit) => Promise<T>
  delete: <T>(url: string, config?: RequestInit) => Promise<T>
}

const defaultConfig: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

const buildUrl = (url: string, params?: Record<string, string | number | boolean>): string => {
  if (!params) return url
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value))
  })
  return `${url}?${searchParams.toString()}`
}

export const apiClient: ApiClient = {
  get: async <T>(url: string, params?: Record<string, string | number | boolean>, config?: RequestInit): Promise<T> => {
    const response = await fetch(`${buildUrl(url, params)}`, {
      ...defaultConfig,
      ...config,
      method: "GET",
    })
    return handleResponse<T>(response)
  },

  post: async <T>(url: string, data?: Record<string, string | number | boolean>, config?: RequestInit): Promise<T> => {
    const response = await fetch(`${url}`, {
      ...defaultConfig,
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },

  put: async <T>(url: string, data?: Record<string, string | number | boolean>, config?: RequestInit): Promise<T> => {
    const response = await fetch(`${url}`, {
      ...defaultConfig,
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },

  patch: async <T>(url: string, data?: Record<string, string | number | boolean>, config?: RequestInit): Promise<T> => {
    const response = await fetch(`${url}`, {
      ...defaultConfig,
      ...config,
      method: "PATCH",
      body: JSON.stringify(data),
    })
    return handleResponse<T>(response)
  },

  delete: async <T>(url: string, config?: RequestInit): Promise<T> => {
    const response = await fetch(`${url}`, {
      ...defaultConfig,
      ...config,
      method: "DELETE",
    })
    return handleResponse<T>(response)
  },
}
