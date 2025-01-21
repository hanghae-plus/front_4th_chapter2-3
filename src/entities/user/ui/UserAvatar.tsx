interface UserAvatarProps {
  image?: string
  username?: string
  onClick?: () => void
}

export const UserAvatar = ({ image, username, onClick }: UserAvatarProps) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
      <img src={image} alt={username} className="w-8 h-8 rounded-full" />
      <span>{username}</span>
    </div>
  )
}
