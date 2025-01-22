import { Dialog } from "@/shared/ui";

import { useModalStore } from "../model";

export const Modal = () => {
  const { content, isOpen, close } = useModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {content}
    </Dialog>
  );
};
