import { User } from "@entities/user/model"

interface UserProfileProps {
  user: User | null
}

export const UserProfile = ({ user }: UserProfileProps) => (
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
