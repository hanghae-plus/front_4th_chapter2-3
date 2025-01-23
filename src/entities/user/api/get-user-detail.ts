import { UserDetail } from '../index.tsx';

export const getUserDetail = async (userId: number): Promise<UserDetail> => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`사용자 정보 가져오기 오류: ${response.statusText}`);
  }

  return await response.json();
};
