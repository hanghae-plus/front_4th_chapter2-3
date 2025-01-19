import { PostsAPI } from '../api/post.api'
import { NewPost, Post } from '../models/types'

export const getPostList = async (limit: number, skip: number) => {
  try {
    const response = await PostsAPI.getList(limit, skip)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('게시물 목록 조회 오류:', error)
    throw error
  }
}

export const getPostTags = async () => {
  try {
    const response = await PostsAPI.getTags()
    const data = await response.json()
    return data
  } catch (error) {
    console.error('태그 목록 조회 오류:', error)
    throw error
  }
}

export const getPostListByTag = async (tag: string) => {
  try {
    const response = await PostsAPI.getByTag(tag)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('태그별 게시물 조회 오류:', error)
    throw error
  }
}

export const getPostListBySearch = async (query: string) => {
  try {
    const response = await PostsAPI.search(query)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('게시물 검색 오류:', error)
    throw error
  }
}

export const postPost = async (post: NewPost) => {
  try {
    const response = await PostsAPI.create(post)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('게시물 생성 오류:', error)
    throw error
  }
}

export const putPost = async (post: Post) => {
  try {
    const response = await PostsAPI.update(post)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('게시물 수정 오류:', error)
    throw error
  }
}

export const deletePost = async (id: number) => {
  try {
    const response = await PostsAPI.delete(id)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('게시물 삭제 오류:', error)
    throw error
  }
}
