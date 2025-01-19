import { CommentsAPI } from '../api/comments.api'
import { Comment, NewComment } from '../models/types'

export const getComments = async (postId: number) => {
  try {
    const response = await CommentsAPI.getByPostId(postId)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('댓글 목록 조회 오류:', error)
    throw error
  }
}

export const postComment = async (comment: NewComment) => {
  try {
    const response = await CommentsAPI.create(comment)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('댓글 생성 오류:', error)
    throw error
  }
}

export const putComment = async (comment: Comment) => {
  try {
    const response = await CommentsAPI.update(comment)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('댓글 수정 오류:', error)
    throw error
  }
}

export const deleteComment = async (id: number) => {
  try {
    const response = await CommentsAPI.delete(id)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('댓글 삭제 오류:', error)
    throw error
  }
}

export const patchComment = async (id: number, likes: number) => {
  try {
    const response = await CommentsAPI.updateLikes(id, likes)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('댓글 좋아요 수정 오류:', error)
    throw error
  }
}
