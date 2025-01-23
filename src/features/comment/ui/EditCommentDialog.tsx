import EditCommentForm from './EditCommentForm.tsx';
import { useCommentStore } from '../model';
import { BaseDialog } from '@/shared/ui';

const EditCommentDialog = () => {
  const { showEditCommentDialog, setShowEditCommentDialog } = useCommentStore();

  return (
    <BaseDialog
      open={showEditCommentDialog}
      onOpenChange={setShowEditCommentDialog}
      title='댓글 수정'
    >
      <EditCommentForm />
    </BaseDialog>
  );
};

export default EditCommentDialog;
