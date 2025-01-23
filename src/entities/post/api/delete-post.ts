export const deletePost = async (postId: number): Promise<void> => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`게시물 삭제 오류: ${response.statusText}`);
  }
};
