import { BaseDialog } from '../../../shared/ui';
import useCommentStore from '../../comment/model/use-comment-store.ts';
import EditCommentForm from './EditCommentForm.tsx';

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
