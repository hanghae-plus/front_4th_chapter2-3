interface UserAvatarProps {
  image?: string
  username?: string
  onClick?: () => void
}

function UserAvatar(props: UserAvatarProps) {
  const { image, username, onClick } = props

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
      <img src={image} alt={username} className="w-8 h-8 rounded-full" />
      <span>{username}</span>
    </div>
  )
}

export { UserAvatar }
