import { User } from "@entities/user/model"

interface UserInfoProps {
  user: User | null
}

export const UserInfo = ({ user }: UserInfoProps) => (
  <div className="space-y-4">
    {user && (
      <>
        <div>이름: {user.username}</div>
        <div>이메일: {user.email}</div>
        <div>전화번호: {user.phone}</div>
      </>
    )}
  </div>
)
