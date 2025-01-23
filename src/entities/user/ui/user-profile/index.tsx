import { useUserStore } from "@features/user/model/stores"

export const UserProfile = () => {
  const user = useUserStore((state) => state.selectedUser)

  return (
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
}
