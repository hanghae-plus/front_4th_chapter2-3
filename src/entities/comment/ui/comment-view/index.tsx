interface CommentViewProps {
  username: string
  body: string
  likes: number
}

export const CommentView = ({ username, body, likes }: CommentViewProps) => (
  <div className="text-sm">
    <span className="font-medium">{username}</span>
    <span className="mx-2">·</span>
    <span>{body}</span>
    {likes > 0 && <span className="text-gray-500 text-xs ml-2">좋아요 {likes}개</span>}
  </div>
)
