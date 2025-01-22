import { User } from "@entities/user/model"
import { useUserStore } from "@features/user/model/stores"

export const useUserManager = () => {
  const store = useUserStore()

  const handleUserClick = async (user: User | undefined) => {
    if (!user) return
    await store.openUserModal(user)
  }

  return {
    ...store,
    handleUserClick,
  }
}
