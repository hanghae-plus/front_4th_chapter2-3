import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../shared/ui'
import { Comment, NewComment, Post } from '../models/types'
import { highlightText } from '../utils/highligtText'
import { Comments } from './Comments'
import { useSearchParam } from '../hooks/useQueryParams'

type PostDetailModalProps = {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: Dispatch<SetStateAction<boolean>>
  selectedPost: Post | null
  comments: Record<number, Comment[]>
  setNewComment: Dispatch<SetStateAction<NewComment>>
  setShowAddCommentDialog: Dispatch<SetStateAction<boolean>>
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
  setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>
  deletedComment: (id: number, postId: number) => void
  likeComment: (id: number, postId: number) => void
}

export const PostDetailModal = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  comments,
  setNewComment,
  setShowAddCommentDialog,
  setSelectedComment,
  setShowEditCommentDialog,
  deletedComment,
  likeComment,
}: PostDetailModalProps) => {
  const [searchQuery] = useSearchParam()
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{selectedPost?.title ? highlightText(selectedPost.title, searchQuery) : ''}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{selectedPost?.body ? highlightText(selectedPost.body, searchQuery) : ''}</p>
          {selectedPost?.id ? (
            <Comments
              comments={comments[selectedPost.id]}
              postId={selectedPost.id}
              searchQuery={searchQuery}
              setNewComment={setNewComment}
              setShowAddCommentDialog={setShowAddCommentDialog}
              setSelectedComment={setSelectedComment}
              setShowEditCommentDialog={setShowEditCommentDialog}
              deletedComment={deletedComment}
              likeComment={likeComment}
            />
          ) : (
            ''
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
