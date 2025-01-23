import { BaseDialog } from '@/shared/ui';
import { useCommentStore } from '../model';
import AddCommentForm from './AddCommentForm.tsx';

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
