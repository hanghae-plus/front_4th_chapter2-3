import { useQuery } from "@tanstack/react-query"
import { getPostsWithUsers } from "../api/getPostsWithUsers.ts"
import { fetchPosts } from "../../../entities/posts/api/fetchPosts.ts"
import { fetchUsers } from "../../../entities/posts/api/fetchUsers.ts"
import { TypeLimit, TypeSkip } from "../../../entities/posts/types/types.ts"

export const usePostsWithUsers = async (limit: TypeLimit, skip: TypeSkip, sortBy : any, sortOrder) => {
  const [postsResponse, usersResponse] = await Promise.all([
    fetchPosts({limit, skip}),
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