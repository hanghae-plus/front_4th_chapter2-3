export const fetchUsers = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image");
  return response.json();
};