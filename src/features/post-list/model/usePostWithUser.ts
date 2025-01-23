import { useUser } from "@entities/user/model/useUser.ts";
import { useMemo } from "react";
import { usePost } from "@entities/post/model/usePost.ts";

export const usePostsWithUsers = () => {
  const { users, isLoading: isLoadingUsers } = useUser();
  const { posts, isLoading: isLoadingPosts } = usePost();

  const postWithUser = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId),
      })),
    [posts, users],
  );
  return {
    posts: postWithUser,
    isLoading: isLoadingUsers || isLoadingPosts,
  };
};
