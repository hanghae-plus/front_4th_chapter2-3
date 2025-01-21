import { fetchUsers } from "../../../entities/posts/api/fetchUsers.ts"
import { fetchPostsWithTag } from "../../../entities/posts/api/fetchPostsWithTag.ts"

export const getPostsWithUsers = async (tag: any) => {
  const [postsData, usersData] = await Promise.all([
    fetchPostsWithTag(tag),
    fetchUsers()
  ]);
  
  return {
    posts: postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    })),
    total: postsData.total
  };
};