import { create } from "zustand"

interface CommentModalStore {
  children: string | React.ReactNode
  visible: boolean
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
  openCommentModal: (data: CommentModal, closeAction?: () => void) => void
  closeCommentModal: (key?: string) => void
}

interface CommentModal {
  visible?: boolean
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
  children: string | React.ReactNode
}

const initialState: CommentModal = {
  visible: false,
  title: "",
  desc: "",
  children: "",
}

const useCommentModalStore = create<CommentModalStore>((set) => ({
  visible: false,
  title: "",
  desc: "",
  children: "",
  openCommentModal: (data) =>
    set({
      ...data,
      visible: true,
    }),
  closeCommentModal: () => set({ ...initialState }),
}))

export default useCommentModalStore
