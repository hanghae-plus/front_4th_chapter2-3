export const getTags = async () => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()
  return data
}
