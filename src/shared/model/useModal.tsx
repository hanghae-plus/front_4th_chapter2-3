import { useContext } from "react";
import { useState, useCallback, createContext, PropsWithChildren, useMemo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext<{
  isOpenModal: boolean;
  handleModalToggle: () => void;
} | null>(null);

export function ModalProvider({ children }: PropsWithChildren) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalToggle = useCallback(() => setIsOpenModal((x) => !x), []);

  const context = useMemo(
    () => ({
      isOpenModal,
      handleModalToggle,
    }),
    [isOpenModal, handleModalToggle],
  );

  return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
  const context = useContext(ModalContext);

  if (context == null) {
    throw new Error("useModal is only available within ModalProvider.");
  }

  const { isOpenModal, handleModalToggle } = context;

  return {
    isOpenModal,
    handleModalToggle,
  } as const;
}
