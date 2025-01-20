import { User } from "@entities/user/model"

export const usersApi = {
  // 사용자 정보 가져오기
  async fetchUserById(userId: number): Promise<User> {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error('사용자 정보를 가져오는데 실패했습니다')
    }
    return response.json()
  }
}