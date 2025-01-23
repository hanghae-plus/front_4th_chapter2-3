import { useQuery } from '@tanstack/react-query';
import { UserDetailType } from '../../../entities/user/model/types';

export const useUserDetail = (userId: number) =>
  useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      return data as UserDetailType;
    },
    enabled: !!userId,
  });

export const useUserList = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users?limit=0&select=username,image');
      const data = await response.json();
      return data.users;
    },
  });
