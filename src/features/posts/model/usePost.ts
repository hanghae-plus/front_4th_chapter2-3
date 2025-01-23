import { usePostFilter } from "./usePostFilter";
import { useSuspenseQueryGetPosts } from "./useSuspenseQueryGetPosts";

export const usePost = () => {
  const { params } = usePostFilter();
  const {
    data: { posts, total },
  } = useSuspenseQueryGetPosts(params);

  return {
    posts,
    total,
  };
};
