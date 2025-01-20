import axios from "axios"

// 사용자 조회
export const getUsers = async () => {
  const { data } = await axios.get("/api/users?limit=0&select=username,image")
  return data
}
