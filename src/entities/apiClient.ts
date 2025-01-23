const BASE_URL = '/api';

export const apiClient = {
  get: async (url: string) => {
    const response = await fetch(`${BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`GET ${url} failed with status ${response.status}`);
    }
    return response.json();
  },

  post: async (url: string, data: unknown) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`POST ${url} failed with status ${response.status}`);
    }
    return response.json();
  },

  put: async (url: string, data: unknown) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`PUT ${url} failed with status ${response.status}`);
    }
    return response.json();
  },

  delete: async (url: string) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`DELETE ${url} failed with status ${response.status}`);
    }
    return response.json();
  },
};
