export const fetchPostsWithTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`);
  return response.json();
};