import axios from "axios"
import { getUserResponse } from "../model/type"

// 사용자 조회
export const getUsers = async (id: number): Promise<getUserResponse> => {
  const { data } = await axios.get(`/api/users/${id}`)
  return data
}
