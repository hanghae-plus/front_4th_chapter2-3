import { Comment, NewComment } from "@entities/comment";
import { create } from "zustand";

interface CommentState {
  selectedComment: Comment | null;
  newComment: NewComment;
  showAddCommentDialog: boolean;
  showEditCommentDialog: boolean;
  setSelectedComment: (comment: Comment) => void;
  setNewComment: (newComment: NewComment) => void;
  setShowAddCommentDialog: (value: boolean) => void;
  setShowEditCommentDialog: (value: boolean) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  selectedComment: null,
  newComment: { body: "", postId: null, userId: 1 },
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  setSelectedComment: (selectedComment) => set({ selectedComment }),
  setNewComment: (newComment) => set({ newComment }),
  setShowAddCommentDialog: (showAddCommentDialog) => set({ showAddCommentDialog }),
  setShowEditCommentDialog: (showEditCommentDialog) => set({ showEditCommentDialog }),
}));
