import { useMutation, useQuery } from "@tanstack/react-query"
import { deletePosts, getPosts, getSearchPosts, postPosts, putPosts } from "../../../entities/post/api"
import {
  getPostRequest,
  getSearchPostsRequest,
  postPostsRequest,
  putPostsRequest,
} from "../../../entities/post/model/type"

const queryKeys = {
  all: ["post"] as const,
}

//게시물 조회
export const useGetPosts = (params: getPostRequest) => {
  return useQuery({
    queryKey: [...queryKeys.all, params],
    queryFn: () => getPosts(params),
  })
}

//게시물 검색
export const useGetSearchPosts = () => {
  return useMutation({
    mutationFn: (params: getSearchPostsRequest) => getSearchPosts(params),
  })
}

//게시물 등록
export const usePostPosts = () => {
  return useMutation({
    mutationFn: (params: postPostsRequest) => postPosts(params),
  })
}

//게시물 업데이트
export const usePutPosts = () => {
  return useMutation({
    mutationFn: (params: putPostsRequest) => putPosts(params),
  })
}

//게시물 삭제
export const useDeletePosts = () => {
  return useMutation({
    mutationFn: (id: number) => deletePosts(id),
  })
}
