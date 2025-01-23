import { Dialog } from "@/shared/ui";

import { useModalStore } from "../model";

export const Modal = () => {
  const { contents, isOpen, close } = useModalStore();
  const content = contents.at(-1);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {content}
    </Dialog>
  );
};
