import { BaseDialog } from '../../../shared/ui';
import usePostStore from '../model/use-post-store.ts';
import EditPostForm from './EditPostForm.tsx';

const EditPostDialog = () => {
  const { showEditDialog, setShowEditDialog } = usePostStore([
    'showEditDialog',
    'setShowEditDialog',
  ]);

  return (
    <BaseDialog open={showEditDialog} onOpenChange={setShowEditDialog} title='게시물 수정'>
      <EditPostForm />
    </BaseDialog>
  );
};

export default EditPostDialog;
