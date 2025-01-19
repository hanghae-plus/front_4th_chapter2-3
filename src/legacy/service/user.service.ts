import { UsersAPI } from '../api/user.api'

export const getUserList = async () => {
  try {
    const response = await UsersAPI.getList()
    const data = await response.json()
    return data
  } catch (error) {
    console.error('사용자 목록 조회 오류:', error)
    throw error
  }
}

export const getUser = async (id: number) => {
  try {
    const response = await UsersAPI.getById(id)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('사용자 조회 오류:', error)
    throw error
  }
}
