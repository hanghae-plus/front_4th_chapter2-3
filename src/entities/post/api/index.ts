import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Post, PostResponse } from "@/types/post.ts";
import { Tag } from "@/types/tag.ts";

export const useFetchPostsQuery = (params: {
  searchQuery: string | null;
  tag: string | null;
  limit: number;
  skip: number;
}) => {
  const { searchQuery, tag, limit, skip } = params;
  return useQuery<PostResponse>({
    queryKey: ["posts", { searchQuery, tag, limit, skip }],
    queryFn: async () => {
      if (searchQuery) {
        return axios.get(`/api/posts/search?q=${searchQuery}`).then((res) => res.data);
      }
      if (tag) {
        return axios.get(`/api/posts/tag/${tag}?limit=${limit}&skip=${skip}`).then((res) => res.data);
      }
      return axios.get(`/api/posts?limit=${limit}&skip=${skip}`).then((res) => res.data);
    },
    enabled: !searchQuery || !tag,
  });
};

// 게시글에서 사용중인 태그 목록 가져오기
export const useFetchTagsQuery = () => {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: () => axios.get("/api/posts/tags").then((res) => res.data),
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
