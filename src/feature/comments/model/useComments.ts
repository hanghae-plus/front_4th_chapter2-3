import React, { useEffect, useState } from "react"
import { deleteCommentApi, getCommentsApi, updateCommentApi } from "../../../entity/comment/api/comment"
import { Comments } from "../../../entity/comment/model/types"

const useComments = (postId) => {
  const [comments, setComments] = useState<Comments>({})

  useEffect(() => {
    if (!postId) return
    getComments(postId)
  }, [postId])

  const getComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const comments = await getCommentsApi(postId)
      setComments((prev) => ({ ...prev, [postId]: comments }))
      //fetch comments
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  const likeComment = async (id, postId) => {
    try {
      const likes = comments[postId]?.find((c) => c.id === id)
      if (!likes) return
      await updateCommentApi(id, { likes: Number(likes) + 1 })

      //fetch comments
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  const deleteComment = async (id) => {
    try {
      await deleteCommentApi(id)

      //fetch comments
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return { likeComment, comments, deleteComment }
}

export default useComments
