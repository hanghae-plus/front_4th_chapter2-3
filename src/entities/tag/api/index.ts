import axios from "axios"
import { getPostByTagsRequest, getTagsResponse } from "../model/type"

//태그 조회
export const getTags = async (): Promise<getTagsResponse[]> => {
  const { data } = await axios.get("/api/posts/tags")
  return data
}

//태그로 게시물 조회
export const getPostsByTag = async (tag: string): Promise<getPostByTagsRequest> => {
  const { data } = await axios.get(`/api/posts/tag/${tag}`)
  return data
}
