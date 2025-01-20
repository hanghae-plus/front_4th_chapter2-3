interface FetchOptions<P = Record<string, string | number>> extends RequestInit {
  params?: P
}

interface HttpResponse<T> {
  data: T
  status: number
  statusText: string
  ok: boolean
}

export class HttpClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private buildURL(endpoint: string, params?: unknown): string {
    const url = new URL(this.baseURL + endpoint)

    if (params && typeof params === "object") {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    return url.toString()
  }

  private async fetchJSON<T, P = Record<string, string | number>>(
    endpoint: string,
    options: FetchOptions<P> = {},
  ): Promise<HttpResponse<T>> {
    const { params, headers, ...restOptions } = options
    const url = this.buildURL(endpoint, params)

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...restOptions,
      })

      const data = response.status === 204 ? ({} as T) : await response.json()

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      }
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error)
      throw error
    }
  }

  async get<T, P = Record<string, string | number>>(endpoint: string, params?: P): Promise<HttpResponse<T>> {
    return this.fetchJSON<T, P>(endpoint, { params })
  }

  async post<T>(endpoint: string, data?: unknown): Promise<HttpResponse<T>> {
    return this.fetchJSON<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown): Promise<HttpResponse<T>> {
    return this.fetchJSON<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<HttpResponse<T>> {
    return this.fetchJSON<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<HttpResponse<T>> {
    return this.fetchJSON<T>(endpoint, { method: "DELETE" })
  }
}

export const httpClient = new HttpClient("/api")
