import { useState } from "react"
import { useGetUsers } from "../api"
import UserModal from "./UserModal"

interface UserProfileProps {
  id: number
}

function UserProfile(props: UserProfileProps) {
  const { id } = props
  const [open, setOpen] = useState(false)

  const { data: user } = useGetUsers(id)

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setOpen(true)}>
      <img src={user?.image} alt={user?.username} className="w-8 h-8 rounded-full" />
      <span>{user?.username}</span>
      <UserModal isOpen={open} onClose={() => setOpen(false)} user={user} />
    </div>
  )
}

export default UserProfile
