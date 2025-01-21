import { Button } from "../../../shared/ui"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { highlightText } from "../../posts/lib/highlightText.tsx"
import useComments from "../model/action.ts"
import { useAtomValue, useSetAtom } from "jotai"
import { showAddCommentDialogAtom } from "../../../entities/modal/model/store.ts"
import { searchQueryAtom } from "../../search/model/store.ts"

// 댓글 렌더링
export default function RenderComments(postId)  {
  const {
    comments,
    setNewComment,
    setSelectedComment,
    deleteComment,
    likeComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
  } = useComments();
  const searchQuery = useAtomValue(searchQueryAtom);

  
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}