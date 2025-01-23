import { FunctionComponent } from "react"
import { TUser } from "../model/types"

type TUserProfile = { user: TUser }

const UserProfile: FunctionComponent<TUserProfile> = ({ user }) => {
  return (
    <div className="space-y-4">
      <img src={user.image} alt={user?.username} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-xl font-semibold text-center">{user?.username}</h3>
      <div className="space-y-2">
        <p>
          <strong>이름:</strong> {user?.firstName} {user?.lastName}
        </p>
        <p>
          <strong>나이:</strong> {user?.age}
        </p>
        <p>
          <strong>이메일:</strong> {user?.email}
        </p>
        <p>
          <strong>전화번호:</strong> {user?.phone}
        </p>
        <p>
          <strong>주소:</strong> {user?.address?.address}, {user?.address?.city}, {user?.address?.state}
        </p>
        <p>
          <strong>직장:</strong> {user?.company?.name} - {user?.company?.title}
        </p>
      </div>
    </div>
  )
}

export default UserProfile
