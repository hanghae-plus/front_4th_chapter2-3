export const fetchPosts = async ({ limit, skip }: any) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
  return response.json();
};