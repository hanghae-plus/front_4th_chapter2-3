import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../shared/ui'
import { Comment, NewComment, Post } from '../models/types'
import { highlightText } from '../utils/highligtText'
import { Comments } from './Comments'
import { useSearchParam } from '../hooks/useQueryParams'
import { useGetComments } from '../queries/comments.query'

type PostDetailModalProps = {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: Dispatch<SetStateAction<boolean>>
  selectedPost: Post | null
  setNewComment: Dispatch<SetStateAction<NewComment>>
  setShowAddCommentDialog: Dispatch<SetStateAction<boolean>>
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
  setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>
}

export const PostDetailModal = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  setNewComment,
  setShowAddCommentDialog,
  setSelectedComment,
  setShowEditCommentDialog,
}: PostDetailModalProps) => {
  const [searchQuery] = useSearchParam()

  const { data } = useGetComments(selectedPost?.id)

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
              comments={data?.comments}
              postId={selectedPost.id}
              searchQuery={searchQuery}
              setNewComment={setNewComment}
              setShowAddCommentDialog={setShowAddCommentDialog}
              setSelectedComment={setSelectedComment}
              setShowEditCommentDialog={setShowEditCommentDialog}
            />
          ) : (
            ''
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
