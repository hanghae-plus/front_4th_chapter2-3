import { highlightText } from "@/shared/lib/highlight-text"
import { User } from "../../model/types"

interface CommentItemProps {
  id: number
  body: string
  user: User
  likes: number
  searchQuery: string
  renderLikeButton: () => React.ReactNode
  renderEditDialog: () => React.ReactNode
  renderDeleteButton: () => React.ReactNode
}

function CommentItem(props: CommentItemProps) {
  const { id, body, user, searchQuery, renderLikeButton, renderEditDialog, renderDeleteButton } = props

  return (
    <div key={id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate shrink-0">{user.username}:</span>
        <span className="truncate text-balance h-5">{highlightText(body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        {renderLikeButton()}
        {renderEditDialog()}
        {renderDeleteButton()}
      </div>
    </div>
  )
}

export { CommentItem }
