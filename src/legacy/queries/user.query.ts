import { queryOptions, useQuery } from '@tanstack/react-query'
import * as UserService from '../service/user.service'
import { UserListRes } from '../models/dto.types'

export const userKeys = {
  all: ['users'],
  list: () => [...userKeys.all, 'list'],
  detail: (id: number) => [...userKeys.all, 'detail', id],
}

export const userQuery = {
  list: () =>
    queryOptions<UserListRes>({
      queryKey: userKeys.list(),
      queryFn: () => UserService.getUserList(),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: userKeys.detail(id),
      queryFn: () => UserService.getUser(id),
    }),
}

export const useGetUserList = () => useQuery(userQuery.list())

export const useGetUser = (id: number) => useQuery(userQuery.detail(id))
