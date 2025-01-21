import { UserThumbnails } from '../model';

export const getUsers = async (): Promise<UserThumbnails> => {
  const response = await fetch('/api/users?limit=0&select=username,image', { method: 'GET' });
  if (!response.ok) {
    throw new Error(`사용자 가져오기 오류: ${response.statusText}`);
  }
  return await response.json();
};
