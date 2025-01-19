import { useQuery } from "@tanstack/react-query"
import { getPostsWithUsers } from "../api/getPostsWithUsers.ts"

export const usePostsWithUsers = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ['posts', { limit, skip }],
    queryFn: () => getPostsWithUsers({ limit, skip }),
  });
};