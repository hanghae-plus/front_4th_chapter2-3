export const deleteComment = async (commentId: number): Promise<void> => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`댓글 삭제 오류: ${response.statusText}`);
  }
};
