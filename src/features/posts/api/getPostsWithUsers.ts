import { fetchPosts } from "../../../entities/posts/api/fetchPosts.ts"
import { fetchUsers } from "../../../entities/posts/api/fetchUsers.ts"

export const getPostsWithUsers = async ({ limit, skip }: any) => {
  const [postsData, usersData] = await Promise.all([
    fetchPosts({ limit, skip }),
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



// widgets/post-list/PostList.tsx
// const PostList = () => {
//   const [skip, setSkip] = useState(0);
//   const limit = 10;
//
//   const { data, isLoading, error } = usePostsWithUsers(limit, skip);
//
//   if (isLoading) return <div>로딩 중...</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//
//   return (
//     // 게시물 목록 렌더링
//   );
// };