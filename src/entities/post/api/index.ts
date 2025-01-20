import axios from "axios"
import {
  getPostRequest,
  getPostResponse,
  getSearchPostsRequest,
  getSearchPostsResponse,
  postPostsRequest,
  putPostsRequest,
} from "../model/type"

//게시물 조회
export const getPosts = async (params: getPostRequest): Promise<getPostResponse> => {
  const { data } = await axios.get("/api/posts", { params })
  return data
}

//게시물 검색
export const getSearchPosts = async (params: getSearchPostsRequest): Promise<getSearchPostsResponse> => {
  const { data } = await axios.get("api/posts/search", { params })
  return data
}

//게시물 등록
export const postPosts = async (params: postPostsRequest) => {
  const { data } = await axios.post("/api/posts/add", { params })
  return data
}

//게시물 업데이트
export const putPosts = async (params: putPostsRequest) => {
  const { data } = await axios.put(`/api/posts/${params.id}`, { params })
  return data
}

//게시물 삭제
export const deletePosts = async (id: number) => {
  const { data } = await axios.delete(`/api/posts/${id}`)
  return data
}
