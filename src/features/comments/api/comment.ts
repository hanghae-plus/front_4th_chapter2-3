export const getComments = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`);
  return response.json();
};
