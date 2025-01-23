import { useQuery } from '@tanstack/react-query';

import type { UsersResponse } from '@/entities/users/api';
import { get } from '@/shared/api/fetch';

import { usersQueryKeys } from '../config/userQueryKeys';

export const useQueryUsers = () =>
  useQuery<UsersResponse>({
    ...usersQueryKeys.list,
    queryFn: () => get('/api/users?limit=0&select=username,image'),
  });
