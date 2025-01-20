export const getTags = async () => {
  const response = await fetch("/api/posts/tags");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
