import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import type { UsersResponse } from '@/entities/users/api';
import type { User } from '@/entities/users/model';
import { get } from '@/shared/api/fetch';

import { usersQueryKeys } from '../config/userQueryKeys';

export const useQueryUsers = () => {
  const { queryKey } = usersQueryKeys.list;
  const queryFn = () => get('/api/users?limit=0&select=username,image');

  return useQuery<UsersResponse>({ queryKey, queryFn } as UseQueryOptions<UsersResponse, Error>);
};

export const useQueryUser = (id: number) => {
  const { queryKey } = usersQueryKeys.detail(id);
  const queryFn = () => get(`/api/users/${id}`);

  return useQuery<User>({ queryKey, queryFn });
};
