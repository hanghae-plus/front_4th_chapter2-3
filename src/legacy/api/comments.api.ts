import { NewComment, Comment } from '../models/types'

const BASE_URL = '/api/comments'

export const CommentsAPI = {
  getByPostId: (postId: number) => fetch(`${BASE_URL}/post/${postId}`),

  create: (comment: NewComment) =>
    fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    }),

  update: (comment: Comment) =>
    fetch(`${BASE_URL}/${comment.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    }),

  delete: (id: number) =>
    fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    }),

  updateLikes: (id: number, likes: number) =>
    fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes }),
    }),
}
