import { useQuery } from "@tanstack/react-query"
import { getPostsWithUsers } from "../api/getPostsWithUsers.ts"
import { fetchPostsWithTag } from "../../../entities/posts/api/fetchPostsWithTag.ts"
import { fetchUsers } from "../../../entities/posts/api/fetchUsers.ts"

export const usePostsWithTag = async (tag: any) => {
  // return useQuery({
  //   queryKey: ['posts', tag],
  //   queryFn: () => getPostsWithUsers(tag),
  // });
  
  const postsUrl = `/api/posts/tag/${tag}`;
  const [postsResponse, usersResponse] = await Promise.all([
    fetchPostsWithTag(tag),
    fetchUsers()
  ]);
  
  const postsData = await postsResponse;
  const { users: usersData } = await usersResponse;
  
  const posts = postsData.posts.map((post) => ({
    ...post,
    author: usersData.find((user) => user.id === post.userId),
  }));
  
  return {
    posts,
    total: postsData.total
  };
};