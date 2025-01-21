import { useState } from "react"
import { User } from "../../../entities/user/model/types"

export const useSelectedUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return {
    selectedUser,
    setSelectedUser,
  }
}
