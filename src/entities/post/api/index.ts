import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Post, PostResponse } from "@/types/post.ts";

// 게시글에서 사용중인 태그 목록 가져오기
export const useFetchPostsQuery = (limit: number, skip: number) => {
  return useQuery<PostResponse>({
    queryKey: ["posts", limit, skip],
    queryFn: () => axios.get(`/api/posts?limit=${limit}&skip=${skip}`).then((res) => res.data),
  });
};

// 게시글에서 사용중인 태그 목록 가져오기
export const useFetchTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => axios.get("/api/posts/tags").then((res) => res.data),
  });
};

// 검색 쿼리에 일치하는 게시글 목록 가져오기
export const useSearchPostsQuery = (searchQuery: string) => {
  return useQuery({
    queryKey: ["posts", "search", searchQuery],
    queryFn: () => axios.get(`/api/posts/search?q=${searchQuery}`).then((res) => res.data),
    enabled: !!searchQuery,
  });
};

// 태그와 일치하는 게시글 목록 가져오기
export const useFetchPostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: ["posts", "tag", tag],
    queryFn: () => axios.get(`/api/posts/tag/${tag}`).then((res) => res.data),
    enabled: !!tag,
  });
};

// 게시글 추가하기
export const useAddPostQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: Partial<Post>) => axios.post("/api/posts/add", newPost),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
};
// 게시글 업데이트하기
export const useUpdatePostQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: Post) => axios.put(`/api/posts/${post.id}`, post).then((res) => res.data),
    meta: {
      invalidates: queryClient.invalidateQueries({ queryKey: ["posts"] }),
    },
  });
};

// 게시글 삭제하기
export const useDeletePostQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => axios.delete(`/api/posts/${postId}`).then((res) => res.data),
    meta: {
      invalidates: queryClient.invalidateQueries({ queryKey: ["posts"] }),
    },
  });
};
