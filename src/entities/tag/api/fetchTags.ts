export const fetchTags = async () => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
