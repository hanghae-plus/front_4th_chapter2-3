import { create } from "zustand"
import { Post } from "../../post/model/types"
import { Comment } from "./types"

const useCommentStore = create<{
  commentsMap: Record<Post["id"], Comment[]>
  setCommentsMap: (commentsMap: Record<Post["id"], Comment[]>) => void
  setComment: (comment: Comment, postId: Post["id"]) => void
  setComments: (comments: Comment[], postId: Post["id"]) => void
  removeComment: (
    comment: Comment,
    curCommentsMap: Record<Post["id"], Comment[]>,
  ) => void
  updateComment: (comment: Comment) => void
}>((set) => ({
  commentsMap: {},
  setCommentsMap: (commentsMap: Record<Post["id"], Comment[]>) => {
    set(() => ({ commentsMap }))
  },
  setComments: (comments: Comment[], postId: Post["id"]) => {
    set((state) => ({
      commentsMap: {
        ...state.commentsMap,
        [postId]: comments,
      },
    }))
  },
  setComment: (comment: Comment, postId: Post["id"]) => {
    set((state) => ({
      commentsMap: {
        ...state.commentsMap,
        [postId]: [...state.commentsMap[postId], comment],
      },
    }))
  },
  removeComment: (comment, curCommentsMap) => {
    console.log(comment, curCommentsMap)
    return set((state) => ({
      commentsMap: {
        ...state.commentsMap,
        [comment.postId]: state.commentsMap[comment.postId].filter(
          (c) => c.id !== comment.id,
        ),
      },
    }))
  },
  updateComment: (comment: Comment) =>
    set((state) => ({
      commentsMap: {
        ...state.commentsMap,
        [comment.postId]: state.commentsMap[comment.postId].map((c) =>
          c.id === comment.id ? comment : c,
        ),
      },
    })),
}))

export { useCommentStore }
