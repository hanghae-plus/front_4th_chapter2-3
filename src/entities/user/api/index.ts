import axios from "axios"

// 사용자 조회
export const getUsers = async (id: number) => {
  const { data } = await axios.get(`/api/users/${id}`)
  return data
}
