import axios, { AxiosResponse } from "axios"

export const getTags = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`/api/posts/tags`)
  return response.data.json()
}
