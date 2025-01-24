import { useDialog } from "@shared/dialog/model/useDialog.ts";
import { Dialog } from "@shared/dialog/ui";

export const DialogProvider = () => {
  const { stack, close } = useDialog();

  if (stack.length === 0) return null;

  return (
    <>
      {stack.map(({ component, id }) => (
        <Dialog key={id} open={true} onOpenChange={(open) => !open && close()}>
          {component}
        </Dialog>
      ))}
    </>
  );
};
