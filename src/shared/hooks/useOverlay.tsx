import { useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import useOverlayGroupStore from "../store/useOverlayGroupStore";
import OverlayController, {
  CreateOverlayElement,
  OverlayControlRef,
} from "../ui/OverlayController";

interface Options {
  exitOnUnmount?: boolean;
}

export const useOverlay = ({ exitOnUnmount = true }: Options = {}) => {
  const id = useRef(`${Date.now()}`).current;
  const { mount, unmount } = useOverlayGroupStore(
    useShallow((store) => ({
      mount: store.mount,
      unmount: store.unmount,
    })),
  );

  const overlayRef = useRef<OverlayControlRef | null>(null);

  useEffect(() => {
    return () => {
      if (exitOnUnmount) unmount(id);
    };
  }, [id, unmount, exitOnUnmount]);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => unmount(id)}
          />,
        );
      },

      close: () => {
        overlayRef.current?.close();
      },

      exit: () => {
        unmount(id);
      },
    }),
    [id, mount, unmount],
  );
};
