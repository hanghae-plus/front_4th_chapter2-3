export const fetchTags = async (): Promise<any[]> => {
  const response = await fetch("/api/posts/tags")
  if (!response.ok) {
    throw new Error('태그를 가져오는데 실패했습니다')
  }
  console.log("불러오나", response)
  return response.json()
}