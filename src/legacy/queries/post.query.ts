import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { NewPost, Post } from '../models/types'
import * as PostService from '../service/post.service'
import { PostListRes, TagListRes } from '../models/dto.types'

export const postKeys = {
  all: ['posts'],
  list: (limit: number, skip: number) => [...postKeys.all, 'list', { limit, skip }],
  tags: () => [...postKeys.all, 'tags'],
  byTag: (tag: string) => [...postKeys.all, 'byTag', tag],
  search: (query: string) => [...postKeys.all, 'search', query],
}

export const postQuery = {
  list: (limit: number, skip: number) =>
    queryOptions<PostListRes>({
      queryKey: postKeys.list(limit, skip),
      queryFn: () => PostService.getPostList(limit, skip),
    }),

  tags: () =>
    queryOptions<TagListRes>({
      queryKey: postKeys.tags(),
      queryFn: () => PostService.getPostTags(),
    }),

  byTag: (tag: string) =>
    queryOptions<PostListRes>({
      queryKey: postKeys.byTag(tag),
      queryFn: () => PostService.getPostListByTag(tag),
      enabled: !!tag,
    }),

  search: (query: string) =>
    queryOptions<PostListRes>({
      queryKey: postKeys.search(query),
      queryFn: () => PostService.getPostListBySearch(query),
      enabled: false,
    }),
}

export const useGetPostList = (limit: number, skip: number) => useQuery(postQuery.list(limit, skip))

export const useGetPostTags = () => useQuery(postQuery.tags())

export const useGetPostListByTag = (tag: string) => useQuery(postQuery.byTag(tag))

export const useGetPostListBySearch = (query: string) => useQuery(postQuery.search(query))

export const useCreatePost = () =>
  useMutation({
    mutationFn: (post: NewPost) => PostService.postPost(post),
    meta: {
      invalidates: [postKeys.all],
    },
  })

export const useUpdatePost = () =>
  useMutation({
    mutationFn: (post: Post) => PostService.putPost(post),
    meta: {
      invalidates: [postKeys.all],
    },
  })

export const useDeletePost = () =>
  useMutation({
    mutationFn: (id: number) => PostService.deletePost(id),
    meta: {
      invalidates: [postKeys.all],
    },
  })
