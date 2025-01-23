import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import HighlightText from "../../../shared/ui/HighlightText"
import RenderComments from "../../comment/ui/RenderComments"
import { Post } from "../types"

interface DetailPostProps {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>>
  searchQuery: string
  selectedPost: Post | null
  setNewComment: React.Dispatch<React.SetStateAction<{ body: string; postId: number | null; userId: number }>>
  comments: { [key: number]: Comment[] }
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  likeComment: (id: number, postId: number) => Promise<void>
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  deleteComment: (id: number, postId: number) => Promise<void>
}

const DetailPost: React.FC<DetailPostProps> = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  searchQuery,
  selectedPost,
  setNewComment,
  comments,
  setShowAddCommentDialog,
  likeComment,
  setSelectedComment,
  setShowEditCommentDialog,
  deleteComment,
}) => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body} highlight={searchQuery} />
          </p>
          <RenderComments
            postId={selectedPost?.id}
            comments={comments}
            searchQuery={searchQuery}
            setNewComment={setNewComment}
            setShowAddCommentDialog={setShowAddCommentDialog}
            likeComment={likeComment}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            deleteComment={deleteComment}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DetailPost
