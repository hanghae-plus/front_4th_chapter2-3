import { queryOptions, useQuery } from "@tanstack/react-query";
import { FetchPostsParams, fetchPosts } from "../../../entities/post/api";
import { IUser, fetchAllUsers } from "../../../entities/user/api";

export const fetchPostsWithAuthor = async (params: FetchPostsParams) => {
  const [{ posts, ...postsData }, { users }] = await Promise.all([
    fetchPosts(params),
    fetchAllUsers(),
  ]);

  // 빠른 조회를 위한 유저 데이터 맵핑
  const userMap = new Map<number, IUser>();
  users.forEach((user) => userMap.set(user.id, user));

  // 조회된 게시글에 작성자 데이터 추가
  const postsWithAuthor = posts.map((post) => ({
    ...post,
    author: userMap.get(post.userId) || null,
  }));

  return { ...postsData, posts: postsWithAuthor };
};

const fetchQueryOptions = (params: FetchPostsParams) => {
  return queryOptions({
    queryKey: ["postsWithAuthor", params],
    queryFn: () => fetchPostsWithAuthor(params),
  });
};

type FetchQueryOptions = Omit<ReturnType<typeof fetchQueryOptions>, "queryKey" | "queryFn">;

export const useFetchPostsWithAuthor = (
  params: FetchPostsParams,
  options: FetchQueryOptions = {},
) => {
  return useQuery({ ...fetchQueryOptions(params), ...options });
};
