export const getUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
