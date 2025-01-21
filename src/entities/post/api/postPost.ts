import { NewPost, Post } from '../model';

export const postPost = async (newPost: NewPost): Promise<Post> => {
  const response = await fetch('/api/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error(`게시물 추가 오류:${response.statusText}`);
  }

  return await response.json();
};
