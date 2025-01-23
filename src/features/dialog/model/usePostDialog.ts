import { useDialog } from './useDialog';

export const usePostAddDialog = () => {
  const dialog = useDialog();
  const openPostAddDialog = dialog.open;

  return { dialog, openPostAddDialog };
};

export const usePostEditDialog = () => {
  const dialog = useDialog();
  const openPostEditDialog = dialog.open;

  return { dialog, openPostEditDialog };
};
