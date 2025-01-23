import { Tag } from '@/entities/tag';

export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch('/api/posts/tags');

  if (!response.ok) {
    throw new Error(`태그 가져오기 오류: ${response.statusText}`);
  }

  return await response.json();
};
