export const deletePost = async (id: number) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
