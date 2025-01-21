import { User } from '../model';

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`사용자 정보 가져오기 오류: ${response.statusText}`);
  }

  return await response.json();
};
