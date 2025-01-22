import { useModalStore } from "../../../shared/model/useModalStore"
import { useGetUsers } from "../api"

interface UserProfileProps {
  id: number
}

function UserProfile(props: UserProfileProps) {
  const { id } = props

  const { data: user } = useGetUsers(id)
  const { setUserModalOpen } = useModalStore()

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => user && setUserModalOpen(user)}>
      <img src={user?.image} alt={user?.username} className="w-8 h-8 rounded-full" />
      <span>{user?.username}</span>
    </div>
  )
}

export default UserProfile
