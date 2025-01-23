import { Post } from '@/entities/post';

export const putPost = async (selectedPost: Post): Promise<Post> => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(selectedPost),
  });
  if (!response.ok) {
    throw new Error(`게시물 업데이트 오류: ${response.statusText}`);
  }

  return await response.json();
};
