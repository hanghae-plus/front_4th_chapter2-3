import React, { useEffect, useState } from "react"
import {
  addCommentApi,
  deleteCommentApi,
  getCommentsApi,
  updateCommentApi,
  updateCommentLikeApi,
} from "../../../entity/comment/api/comment"
import { Comment, CommentForm, Comments } from "../../../entity/comment/model/types"
import { useModalStore } from "../../../shared/model/useModalStore"

const useComments = () => {
  const [comments, setComments] = useState<Comments>({})
  const { closeModal } = useModalStore()

  const getComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const comments = await getCommentsApi(postId)
      setComments((prev) => ({ ...prev, [postId]: comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  const likeComment = async (id, postId) => {
    try {
      const likes = comments[postId]?.find((c) => c.id === id)?.likes
      if (!likes) return

      const data = await updateCommentLikeApi(id, { likes: Number(likes) + 1 })

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: { likes: Number(likes) + 1 } } : comment,
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  const deleteComment = async (id) => {
    try {
      await deleteCommentApi(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async (comment: CommentForm) => {
    try {
      const data = await addCommentApi(comment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      closeModal()
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  const updateComment = async (comment: Comment) => {
    try {
      const data = await updateCommentApi(comment.id, { body: { ...comment } })
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      closeModal()
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  return { getComments, likeComment, comments, updateComment, deleteComment, addComment }
}

export default useComments
