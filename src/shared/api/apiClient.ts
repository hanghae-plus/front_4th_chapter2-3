import axios from "axios"

export const client = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export const apiClient = {
  get: <T>(url: string, params?: object) => {
    return client.get<T>(url, { params })
  },
  post: <T>(url: string, data?: object) => {
    return client.post<T>(url, data)
  },
  put: <T>(url: string, data?: object) => {
    return client.put<T>(url, data)
  },
  patch: <T>(url: string, data?: object) => {
    return client.put<T>(url, data)
  },
  delete: <T>(url: string) => {
    return client.delete<T>(url)
  },
}
