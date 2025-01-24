export const userApi = {
  getUser: async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`)
      return response.json()
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
      throw error
    }
  },
}
