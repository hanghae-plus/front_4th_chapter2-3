import { useSearchParams } from "react-router-dom";

import { useSuspenseQueryGetPosts } from "./useSuspenseQueryGetPosts";

export const usePost = () => {
  const [searchParams] = useSearchParams();

  const skip = parseInt(searchParams.get("skip") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");
  const searchQuery = searchParams.get("search") || "";
  const tag = searchParams.get("tag") || "";
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("sortOrder") || "asc";

  const {
    data: { posts, total },
  } = useSuspenseQueryGetPosts({ searchQuery, skip, limit, tag, sortBy, order });

  return {
    posts,
    total,
    params: {
      skip,
      limit,
      searchQuery,
      tag,
      sortBy,
      order,
    },
  };
};
