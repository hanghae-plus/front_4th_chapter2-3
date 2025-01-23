import { Modal } from "../../../shared/ui/Modal/Modal"
import { AddToPostForm } from "./AddToPostForm"

interface AddPostModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export const AddPostModal = ({ isOpen, onClose }: AddPostModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} title="새 게시물 추가">
      <AddToPostForm />
    </Modal>
  )
}
