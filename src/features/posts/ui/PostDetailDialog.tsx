import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/ui/dialog';
import { highlightText } from '../../../shared/lib';
import { usePostStore } from '../model/store';
import { useSearchStore } from '../model/searchStore';
import { CommentList } from '../../comments/ui/CommentList';
import { useCommentDialogStore } from '../../comments/model/commentDialogStore';

interface PostDetailDialogProps {
  onDeleteComment: (commentId: number, postId: number) => void;
  onLikeComment: (commentId: number, postId: number) => void;
}

export const PostDetailDialog = ({ onDeleteComment, onLikeComment }: PostDetailDialogProps) => {
  const { selectedPost, showPostDetailDialog, closePostDetailDialog } = usePostStore();
  const { searchQuery } = useSearchStore();
  const { openAddDialog, openEditDialog } = useCommentDialogStore();

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={closePostDetailDialog}>
      <DialogContent className='max-w-3xl'>
        {selectedPost && (
          <>
            <DialogHeader>
              <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
            </DialogHeader>
            <div className='space-y-4'>
              <p>{highlightText(selectedPost?.body, searchQuery)}</p>
              <CommentList
                postId={selectedPost.id}
                onAddClick={openAddDialog}
                onEditClick={openEditDialog}
                onDeleteClick={onDeleteComment}
                onLikeClick={onLikeComment}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
