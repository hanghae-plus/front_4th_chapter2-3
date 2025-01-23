import { Address, Company } from "../../model/types"

interface UserDetailCardProps {
  image?: string
  username?: string
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: Address
  company?: Company
}

function UserDetailCard(props: UserDetailCardProps) {
  const { image, username, firstName, lastName, age, email, phone, address, company } = props

  return (
    <div className="space-y-4">
      <img src={image} alt={username} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-xl font-semibold text-center">{username}</h3>
      <div className="space-y-2">
        <p>
          <strong>이름:</strong> {firstName} {lastName}
        </p>
        <p>
          <strong>나이:</strong> {age}
        </p>
        <p>
          <strong>이메일:</strong> {email}
        </p>
        <p>
          <strong>전화번호:</strong> {phone}
        </p>
        <p>
          <strong>주소:</strong> {address?.address}, {address?.city}, {address?.state}
        </p>
        <p>
          <strong>직장:</strong> {company?.name} - {company?.title}
        </p>
      </div>
    </div>
  )
}

export { UserDetailCard }
