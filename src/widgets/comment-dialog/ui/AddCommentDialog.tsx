import { useCommentStore } from '@/features/comment';
import { AddCommentForm } from '@/features/comment';
import { BaseDialog } from '@/shared/ui';

const AddCommentDialog = () => {
  const { showAddCommentDialog, setShowAddCommentDialog } = useCommentStore();

  return (
    <BaseDialog
      open={showAddCommentDialog}
      onOpenChange={setShowAddCommentDialog}
      title='새 댓글 추가'
    >
      <AddCommentForm />
    </BaseDialog>
  );
};

export default AddCommentDialog;
