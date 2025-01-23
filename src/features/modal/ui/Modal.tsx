import { Suspense } from "react";

import { Dialog, DialogOverlay, DialogPortal, Loading } from "@/shared/ui";

import { useModalStore } from "../model";

export const Modal = () => {
  const { contents, isOpen, close } = useModalStore();
  const content = contents.at(-1);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Suspense fallback={<Loading />}>{content}</Suspense>
      </DialogPortal>
    </Dialog>
  );
};
