import { postsApi } from "../../../entities/posts/api/postsApi.ts"
import { getUsers } from "../../../entities/user/api/usersApi.ts"

// Posts와 Users를 조회하는 함수
export const getPostsWithUsers = async (params) => {
  const [postsResponse, usersResponse] = await Promise.all([
    postsApi(params),
    getUsers()
  ]);
  
  const postsData = await postsResponse;
  const { users: usersData } = await usersResponse;
  
  const posts = postsData.posts.map((post) => ({
    ...post,
    author: usersData.find((user) => user.id === post.userId),
  }));
  
  return {
    ...postsData,
    posts : posts
  };
};