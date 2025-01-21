import { useDialog } from "@shared/dialog/model/useDialog.ts";

export const DialogProvider = () => {
  const { component, isOpen } = useDialog();

  if (!isOpen || !component) return null;

  return <>{component}</>;
};
