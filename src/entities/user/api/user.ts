import { User } from '../../../shared/types';

interface GetUsersParams {
  limit?: number;
  select?: string;
}

export const getUsers = async ({ limit = 0, select = 'username,image' }: GetUsersParams = {}) => {
  const response = await fetch(`/api/users?limit=${limit}&select=${select}`);
  const data = await response.json();
  return data.users;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
};

export const getUserInfo = async (userId: number): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};
