import { UserDetailCard, UserDetailCardSkeleton } from "@/entities/user"
import { useQueryUserDetail } from "../model/use-query-user-detail"

interface UserDetailProps {
  userId?: number
  open?: boolean
}

function UserDetail(props: UserDetailProps) {
  const { userId, open } = props

  const { userData, isLoading } = useQueryUserDetail({ userId, enabled: !!open })

  if (isLoading) return <UserDetailCardSkeleton />

  return (
    <UserDetailCard
      image={userData?.image}
      username={userData?.username}
      firstName={userData?.firstName}
      lastName={userData?.lastName}
      age={userData?.age}
      email={userData?.email}
      phone={userData?.phone}
      address={userData?.address}
      company={userData?.company}
    />
  )
}

export { UserDetail }
