import { User } from "@entities/user/model"
import { useUserStore } from "@features/user/model/stores"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usersApi } from "@entities/user/api"

export const useUserManager = () => {
  const queryClient = useQueryClient()
  const store = useUserStore()

  // 사용자 정보 조회
  const { data: userData } = useQuery({
    queryKey: ["user", store.selectedUser?.id],
    queryFn: () => (store.selectedUser?.id ? usersApi.fetchUserById(store.selectedUser.id) : null),
    enabled: !!store.selectedUser?.id,
  })

  // 사용자 모달 열기 mutation
  const openUserModalMutation = useMutation({
    mutationFn: async (user: User) => {
      const userData = await usersApi.fetchUserById(user.id)
      return userData
    },
    onSuccess: (userData) => {
      store.setSelectedUser(userData)
      store.setShowUserModal(true)
      queryClient.invalidateQueries({ queryKey: ["user", userData.id] })
    },
  })

  const handleUserClick = async (user: User | undefined) => {
    if (!user) return
    openUserModalMutation.mutate(user)
  }

  return {
    ...store,
    userData,
    isLoading: openUserModalMutation.isPending,
    handleUserClick,
  }
}
