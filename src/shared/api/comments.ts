export const commentsApi = {
  getByPost: async (postId: number) => {
    const response = await fetch(`/api/comments/post/${postId}`);
    return response.json();
  },

  create: async (comment: Omit<Comment, 'id'>) => {
    const response = await fetch('/api/comments/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });
    return response.json();
  },

  update: async (id: number, comment: Partial<Comment>) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });
    return response.json();
  },

  delete: async (id: number) => {
    await fetch(`/api/comments/${id}`, { method: 'DELETE' });
  },
};
