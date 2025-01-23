import { useQueryGetUser } from "../model/hooks/useQueryGetUser"

import type { User } from "../model/types/user"

interface UserProfileProps {
  user: User
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { data: userData, isLoading } = useQueryGetUser({ id: user.id })

  if (!userData || isLoading) {
    return <span>로딩중...</span>
  }

  return (
    <div className="space-y-4">
      <img src={userData.image} alt={userData.username} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-xl font-semibold text-center">{userData.username}</h3>
      <div className="space-y-2">
        <p>
          <strong>이름:</strong> {userData.firstName} {userData.lastName}
        </p>
        <p>
          <strong>나이:</strong> {userData.age}
        </p>
        <p>
          <strong>이메일:</strong> {userData.email}
        </p>
        <p>
          <strong>전화번호:</strong> {userData.phone}
        </p>
        <p>
          <strong>주소:</strong> {userData.address.address}, {userData.address.city}, {userData.address.state}
        </p>
        <p>
          <strong>직장:</strong> {userData.company.name} - {userData.company.title}
        </p>
      </div>
    </div>
  )
}

export default UserProfile
