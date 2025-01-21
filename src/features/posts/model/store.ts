import { atom, useAtomValue } from "jotai"
import { InfUser, InfPost } from "../../../entities/posts/types/types.ts"
import { useQuery } from "@tanstack/react-query"
import { getPostsWithUsers } from "../api/getPostsWithUsers.ts"
import { limitAtom, skipAtom } from "../../../modules/model/store.ts"

export const postsAtom = atom<InfPost[]>([]);
export const totalAtom = atom<number>(0);
export const newPostsAtom = atom<InfPost>({ title: "", body: "", userId: 1 })
export const selectedUserAtom = atom<InfUser | null>(null);
export const selectedPostsAtom = atom<InfPost | null>(null);

// tanStackQuery
const DEFAULT_QUERY_RESULT = {
  total: 0,
  posts: [],
  limit: 10,
  skip: 0,
}
export const getPostsQuery = () => {
  const limit = useAtomValue(limitAtom);
  const skip = useAtomValue(skipAtom);
  const {
    data : {posts, total},
    isLoading,
    error
  } = useQuery({
    queryKey : ["posts"],
    queryFn: () => getPostsWithUsers({limit, skip}),
    refetchInterval: 1000 * 60,
    initialData: DEFAULT_QUERY_RESULT
  });
  
  return {posts, total};
}