import { Posts } from '../../../types.ts';

export const getPostsByQuery = async (searchQuery: string): Promise<Posts> => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`);

  if (!response.ok) {
    throw new Error(`게시물 가져오기 오류: ${response.statusText}`);
  }

  return await response.json();
};
