import { User } from 'src/shared/types';

export const getUserInfo = async (userId: number): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};
