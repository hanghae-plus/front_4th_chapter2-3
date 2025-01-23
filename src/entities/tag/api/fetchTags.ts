export const fetchTags = async () => {
  try {
    const response = await fetch("/api/posts/tags")
    const data = await response.json()
    return data

    // TODO: 호출하는 곳에서 처리하도록 수정
    // setTags(data)
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}
