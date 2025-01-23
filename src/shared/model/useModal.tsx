import { useContext } from "react";
import { useState, createContext, PropsWithChildren } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext<{
  modalKeys: string[];
  isOpenModals: boolean[];
  handleModalToggle: (key: string) => void;
} | null>(null);

interface ModalProviderProps extends PropsWithChildren {
  modalKeys: string[];
}
export function ModalProvider({ children, modalKeys }: ModalProviderProps) {
  const [isOpenModals, setIsOpenModals] = useState(Array.from(modalKeys).map(() => false));

  const context = {
    modalKeys,
    isOpenModals,
    handleModalToggle: (key: string) => {
      setIsOpenModals(() => {
        const index = modalKeys.findIndex((x) => x === key);
        if (index === -1 || isOpenModals[index] == null) throw new Error("등록되지 않은 모달입니다.");
        isOpenModals[index] = !isOpenModals[index];
        return [...isOpenModals];
      });
    },
  };

  return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal(key: string) {
  const context = useContext(ModalContext);

  if (context == null) {
    throw new Error("useModal is only available within ModalProvider.");
  }

  const { modalKeys, isOpenModals, handleModalToggle } = context;

  const index = modalKeys.findIndex((x) => x === key);
  if (index === -1 || isOpenModals[index] == null) {
    throw new Error("등록되지 않은 모달입니다.");
  }

  return {
    modalKeys,
    isOpenModal: isOpenModals[index],
    handleModalToggle: () => handleModalToggle(key),
  } as const;
}
