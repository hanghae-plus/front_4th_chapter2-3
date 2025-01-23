import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../shared/ui';
import { usePostStore } from '../model/store';
import { CommentList } from '../../../features/comment/ui/CommentList';
import { highlightText } from '../../../shared/lib/utils/highlight';

interface PostDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
}

/**
 * 게시글 상세 다이얼로그
 * @param isOpen 다이얼로그 열기 상태
 * @param onOpenChange 다이얼로그 열기 상태 변경 함수
 * @param searchQuery 검색 쿼리
 * @returns
 */
export const PostDetailDialog = ({ isOpen, onOpenChange, searchQuery }: PostDetailDialogProps) => {
  const { selectedPost } = usePostStore();

  if (!selectedPost) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title || '', searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <p>{highlightText(selectedPost.body || '', searchQuery)}</p>
          {selectedPost.id && <CommentList postId={selectedPost.id} searchQuery={searchQuery} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
