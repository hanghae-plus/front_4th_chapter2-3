/**
 * 태그 가져오기
 * @param setTags
 */
export const fetchTags = async (setTags) => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    setTags(data)
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}
