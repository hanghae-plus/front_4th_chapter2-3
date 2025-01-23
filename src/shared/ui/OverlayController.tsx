import { JSX, forwardRef, useImperativeHandle, useState } from "react";
import { usePreservedCallback } from "../hooks/usePreservedCallback";

export interface OverlayElementProps {
  opened: boolean;
  close(): void;
  exit(): void;
}

export type CreateOverlayElement = (props: OverlayElementProps) => JSX.Element;

export interface OverlayControlRef {
  close: () => void;
}

interface Props {
  overlayElement: CreateOverlayElement;
  onExit: () => void;
}

const OverlayController = (
  { overlayElement: OverlayElement, onExit }: Props,
  ref: React.ForwardedRef<OverlayControlRef>,
) => {
  const [opened, setOpened] = useState(true);

  const handleClose = usePreservedCallback(() => setOpened(false));

  useImperativeHandle(ref, () => ({ close: handleClose }), [handleClose]);

  return <OverlayElement opened={opened} close={handleClose} exit={onExit} />;
};

export default forwardRef(OverlayController);
