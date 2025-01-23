async function getUser(userId: number) {
  const response = await fetch(`/api/users/${userId}`)
  const user = await response.json()
  return user
}

export { getUser }
