import { useState } from "react"
import { User } from "../../entities/user/model/types"

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchUserProfile = async (userId: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/users/${userId}`)
      const data = await response.json()
      setUser(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    fetchUserProfile,
  }
}
