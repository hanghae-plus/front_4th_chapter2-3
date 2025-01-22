import { useQuery } from '@tanstack/react-query';

import type { UserApiResponse } from '@/entities/users/api';
import { get } from '@/shared/api/fetch';

import { usersQueryKeys } from '../config/userQueryKeys';

export const useQueryUsers = () =>
  useQuery<UserApiResponse[]>({
    ...usersQueryKeys.list,
    queryFn: () => get('/api/users?limit=0&select=username,image'),
  });
