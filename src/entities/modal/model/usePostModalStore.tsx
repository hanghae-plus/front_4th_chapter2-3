import { create } from "zustand"

interface PostModalStore {
  children: string | React.ReactNode
  visible: boolean
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
  openPostModal: (data: PostModal, closeAction?: () => void) => void
  closePostModal: (key?: string) => void
}

interface PostModal {
  visible?: boolean
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
  children: string | React.ReactNode
}

const initialState: PostModal = {
  visible: false,
  title: "",
  desc: "",
  children: "",
}

const usePostModalStore = create<PostModalStore>((set) => ({
  visible: false,
  title: "",
  desc: "",
  children: "",
  openPostModal: (data) =>
    set({
      ...data,
      visible: true,
    }),
  closePostModal: () => set({ ...initialState }),
}))

export default usePostModalStore
