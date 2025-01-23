export const getUsersApi = async () => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data = await response.json()
    return data.users
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
  }
}
