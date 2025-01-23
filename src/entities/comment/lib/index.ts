import { Comment } from "../model/types"

export const replaceComment = (comments: Record<number, Comment[]>, data: Comment) => {
  return comments[data.postId].map((comment) => (comment.id === data.id ? data : comment))
}

export const filterCommentById = (comments: Record<number, Comment[]>, id: number, postId: number) => {
  return comments[postId].filter((comment) => comment.id !== id)
}

export const matchCommentById = (comments: Record<number, Comment[]>, id: number, postId: number) => {
  return comments[postId].find((c) => c.id === id)
}

export const likeCommentById = (comments: Record<number, Comment[]>, data: Comment, postId: number) => {
  return comments[postId].map((comment) => (comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment))
}
