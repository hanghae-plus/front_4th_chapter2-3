import { Comment } from "@/entities/comment/model"
import { atom, useAtom } from "jotai"

const selectedCommentAtom = atom<Comment | null>(null)

export const useComment = () => {
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)

  return new (class {
    selectedComment = selectedComment
    setSelectedComment = setSelectedComment
  })()
}
