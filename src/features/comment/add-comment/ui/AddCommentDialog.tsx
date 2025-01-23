import { BaseDialog } from '../../../../shared/ui';
import useCommentStore from '../../model/use-comment-store.ts';
import AddCommentForm from './AddCommentForm.tsx';

const AddCommentDialog = () => {
  const { showAddCommentDialog, setShowAddCommentDialog } = useCommentStore([
    'showAddCommentDialog',
    'setShowAddCommentDialog',
  ]);

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
