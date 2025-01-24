import { useDialog } from "@shared/dialog/model/useDialog.ts";
import { Dialog } from "@shared/ui";

export const DialogProvider = () => {
  const { component, isOpen, close } = useDialog();

  if (!isOpen || !component) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      {component}
    </Dialog>
  );
};
