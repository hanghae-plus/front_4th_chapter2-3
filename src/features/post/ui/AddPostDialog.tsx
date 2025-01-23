import { BaseDialog } from '../../../shared/ui';
import usePostStore from '../model/use-post-store.ts';
import AddPostForm from './AddPostForm.tsx';

const AddPostDialog = () => {
  const { showAddDialog, setShowAddDialog } = usePostStore(['showAddDialog', 'setShowAddDialog']);

  return (
    <BaseDialog open={showAddDialog} onOpenChange={setShowAddDialog} title='새 게시물 추가'>
      <AddPostForm />
    </BaseDialog>
  );
};

export default AddPostDialog;
