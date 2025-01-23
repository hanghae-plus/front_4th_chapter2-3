import type { usePostDialog } from '@/features/dialog/model';
import { CustomDialog } from '@/features/dialog/ui';
import { useUrlParams } from '@/features/posts/lib';
import { useSelectedPostStore } from '@/features/posts/model';
import { HighlightedText } from '@/shared/ui/HighlightedText';

interface Props {
  dialogState: ReturnType<typeof usePostDialog>;
  renderComments: (postId: number) => React.ReactNode;
}
/**
 * 게시물 추가 다이얼로그
 */
export const PostDetailDialog = ({ dialogState, renderComments }: Props) => {
  const { selectedPost } = useSelectedPostStore();
  const searchQuery = useUrlParams().search;

  return (
    <CustomDialog
      open={dialogState.isOpen}
      onOpenChange={dialogState.close}
      title={
        selectedPost?.title && (
          <HighlightedText text={selectedPost?.title} highlight={searchQuery} />
        )
      }
    >
      <p>
        {selectedPost?.body && (
          <HighlightedText text={selectedPost?.body} highlight={searchQuery} />
        )}
      </p>
      {selectedPost?.id ? renderComments(selectedPost?.id) : null}
    </CustomDialog>
  );
};
