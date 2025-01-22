interface UserInfoProps {
  username: string
  image?: string
  size?: 'sm' | 'md' | 'lg'
}

export const UserInfo = ({ username, image, size = 'sm' }: UserInfoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex items-center gap-2">
      {image && (
        <img 
          src={image} 
          alt={username} 
          className={`${sizeClasses[size]} rounded-full`} 
        />
      )}
      <span className="font-medium">{username}</span>
    </div>
  )
} 