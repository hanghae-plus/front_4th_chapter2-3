import { Comment, NewComment } from "@/entities/comment/model/types"
import { Header } from "./Header"
import { List } from "./List"

interface CommentBodyProps {
  postId: number
  comments: Record<number, Comment[]>
  searchQuery: string
  setNewComment: (updater: (prev: NewComment) => NewComment) => void
  setSelectedComment: (comment: Comment) => void
  likeComment: (id: number, postId: number) => void
  deleteComment: (id: number, postId: number) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
}

export const CommentBody = ({
  postId,
  comments,
  searchQuery,
  setNewComment,
  setSelectedComment,
  likeComment,
  deleteComment,
  setShowAddCommentDialog,
  setShowEditCommentDialog,
}: CommentBodyProps) => {
  return (
    <div className="mt-2">
      <Header postId={postId} setNewComment={setNewComment} setShowAddCommentDialog={setShowAddCommentDialog} />
      <List
        postId={postId}
        comments={comments}
        searchQuery={searchQuery}
        setSelectedComment={setSelectedComment}
        likeComment={likeComment}
        deleteComment={deleteComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
      />
    </div>
  )
}
