import { get } from '@/shared/api/fetch';
import { useMutation } from '@tanstack/react-query';

export const useSelectedUserMutation = () => {
  const { data: selectedUser, mutate: selectUser } = useMutation({
    mutationFn: (id: number) => get(`/api/users/${id}`),
  });

  return { selectedUser, selectUser };
};
