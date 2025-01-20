import { create } from "zustand"
import { Comment } from "../../../entities/comment"

interface CommentStore {
  selectedComment: Comment | null
  setSelectedComment: (comment: Comment | null) => void
}

export const useCommentStore = create<CommentStore>((set) => ({
  selectedComment: null,
  setSelectedComment: (comment) => set({ selectedComment: comment }),
}))
