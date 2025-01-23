export const getAllUsers = () => {
  return fetch("/api/users?limit=0&select=username,image")
}

export const getUser = async (userId: number) => {
  const response = await fetch(`/api/users/${userId}`)
  const data = await response.json()
  return data
}
