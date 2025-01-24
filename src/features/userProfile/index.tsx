import { useAtom } from "jotai"
import { userAtom } from "../../entities/user/model/userAtom"
import { FunctionComponent, useEffect } from "react"
import { getUserById } from "../../entities/user/api/userApi"
import { Loader } from "../../shared/ui"
import UserCard from "../../entities/user/ui/UserCard"

export const UserProfile: FunctionComponent = () => {
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    const loadUser = async () => {
      const fetchedUser = await getUserById(1)
      setUser(fetchedUser)
    }
    loadUser()
  }, [setUser])

  if (!user) {
    return <Loader />
  }

  return <UserCard user={user} />
}
