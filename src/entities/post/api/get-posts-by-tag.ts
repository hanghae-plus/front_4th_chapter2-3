import { Posts } from '@/entities/post';

export const getPostsByTag = async (tag: string): Promise<Posts> => {
  const response = await fetch(`/api/posts/tag/${tag}`, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`태그별 게시물 가져오기 오류: ${response.statusText}`);
  }
  return await response.json();
};
