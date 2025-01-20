import axios from "axios"
import { getCommentsResponse, postCommentsRequest, putCommentsRequest, patchCommentsLikeRequest } from "../model/type"

//댓글 조회
export const getComments = async (postId: number): Promise<getCommentsResponse> => {
  const { data } = await axios.get(`/api/comments/post/${postId}`)
  return data
}

//댓글 추가
export const postComments = async (params: postCommentsRequest) => {
  const { data } = await axios.post("/api/comments/add", { params })
  return data
}

//댓글 업데이트
export const putComments = async (params: putCommentsRequest, id: number) => {
  const { data } = await axios.put(`/api/comments/${id}`, { params })
  return data
}

//댓글 삭제
export const deleteComments = async (id: number) => {
  const { data } = await axios.delete(`/api/comments/${id}`)
  return data
}

//댓글 좋아요
export const patchCommentsLike = async (params: patchCommentsLikeRequest, id: number) => {
  const { data } = await axios.patch(`/api/comments/${id}`, { params })
  return data
}
