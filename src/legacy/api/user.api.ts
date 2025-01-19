const BASE_URL = '/api/users'

export const UsersAPI = {
  getList: () => fetch(`${BASE_URL}?limit=0&select=username,image`),

  getById: (id: number) => fetch(`${BASE_URL}/${id}`),
}
