import { getUserDetail, getUsers } from '@/entities/user';
import { queryOptions } from '@tanstack/react-query';
const QUERY_KEY = 'users';
export const userQueries = {
  users: () =>
    queryOptions({
      queryKey: [QUERY_KEY],
      queryFn: getUsers,
    }),
  userDetail: (userId: number) =>
    queryOptions({
      queryKey: [QUERY_KEY, userId],
      queryFn: () => getUserDetail(userId),
      enabled: !!userId,
    }),
};
