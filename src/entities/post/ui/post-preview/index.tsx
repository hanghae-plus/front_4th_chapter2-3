interface PostPreviewProps {
  title: string
  body: string
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
}

export const PostPreview = ({ title, body, tags, reactions }: PostPreviewProps) => (
  <div className="space-y-2">
    <h3 className="font-medium">{title}</h3>
    <p className="text-sm text-gray-600 line-clamp-2">{body}</p>
    {tags && (
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span key={tag} className="px-1 text-[9px] font-semibold rounded-[4px] text-blue-800 bg-blue-100">
            {tag}
          </span>
        ))}
      </div>
    )}
    {reactions && (
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>좋아요 {reactions.likes}</span>
        <span>싫어요 {reactions.dislikes}</span>
      </div>
    )}
  </div>
)
