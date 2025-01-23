interface UserAvatarProps {
  image?: string
  username?: string
}

function UserAvatar(props: UserAvatarProps) {
  const { image, username } = props
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <img src={image} alt={username} className="w-8 h-8 rounded-full" />
      <span>{username}</span>
    </div>
  )
}

export { UserAvatar }
