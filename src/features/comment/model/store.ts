import { create } from "zustand"
import { Comment, NewComment } from "../../../entities/comment/model/types"

type CommentsState = Record<number, Comment[]>

interface CommentStore {
  comments: CommentsState
  selectedComment: Comment | null
  newComment: Partial<NewComment>
  setComments: (update: (prev: CommentsState) => CommentsState) => void
  setSelectedComment: (comment: Comment | null) => void
  setNewComment: (newComment: Partial<NewComment>) => void
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: {},
  selectedComment: null,
  newComment: { body: "", postId: null, userId: 1 },
  setComments: (update) => {
    set((state) => ({ comments: update(state.comments) }))
  },
  setSelectedComment: (comment) => {
    set({ selectedComment: comment })
  },
  setNewComment: (comment) => {
    set({ newComment: comment })
  },
}))
