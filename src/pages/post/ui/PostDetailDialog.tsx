import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  HighlightText,
} from '../../../shared/ui';
import usePostStore from '../../../features/post/model/usePostStore.ts';
import CommentsInPostDialog from '../../comment/ui/CommentsInPostDialog.tsx';
import useSearchStore from '../../../features/search/model/useSearchStore.ts';

const PostDetailDialog = () => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePostStore([
    'showPostDetailDialog',
    'setShowPostDetailDialog',
    'selectedPost',
  ]);
  const { searchQuery } = useSearchStore(['searchQuery']);

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title!} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <p>
            <HighlightText text={selectedPost?.body!} highlight={searchQuery} />
          </p>
          <CommentsInPostDialog postId={selectedPost?.id!} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailDialog;
