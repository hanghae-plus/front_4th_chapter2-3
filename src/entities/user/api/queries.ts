import { getUserDetail, getUsers } from '@/entities/user';
const QUERY_KEY = 'users';
export const userQueries = {
  users: () => ({
    queryKey: [QUERY_KEY],
    queryFn: getUsers(),
  }),
  userDetail: (userId: number) => ({
    queryKey: [QUERY_KEY, userId],
    queryFn: () => getUserDetail(userId),
    enabled: !!userId,
  }),
};
