import { NewPost, Post } from '../models/types'

const BASE_URL = '/api/posts'

export const PostsAPI = {
  getList: (limit: number, skip: number) => fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`),

  getTags: () => fetch(`${BASE_URL}/tags`),

  getByTag: (tag: string) => fetch(`${BASE_URL}/tag/${tag}`),

  search: (query: string) => fetch(`${BASE_URL}/search?q=${query}`),

  create: (post: NewPost) =>
    fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    }),

  update: (post: Post) =>
    fetch(`${BASE_URL}/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    }),

  delete: (id: number) =>
    fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    }),
}
