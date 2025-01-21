import { useAtom, useSetAtom } from "jotai"
import { commentsAtom, newCommentAtom, selectedCommentAtom } from "../../../entities/comment/model/store.ts"
import { showAddCommentDialogAtom, showEditCommentDialogAtom } from "../../../entities/modal/model/store.ts"
import {
  createCommentApi,
  deleteCommentApi,
  getCommentsApi, likeCommentApi,
  updateCommentApi,
} from "../../../entities/comment/api/commentApi.ts"

export default function useComments() {
  const [comments, setComments] = useAtom(commentsAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const setShowAddCommentDialog = useSetAtom(showAddCommentDialogAtom);
  const setShowEditCommentDialog = useSetAtom(showEditCommentDialogAtom);

  
  const fetchComments = async (postId) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await getCommentsApi(postId);
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }
  
  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await createCommentApi(newComment);
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }
  
  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const data = await updateCommentApi(selectedComment);
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }
  
  // 댓글 삭제
  const deleteComment = async (id, postId) => {
    try {
      await deleteCommentApi(id);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }
  
  // 댓글 좋아요
  const likeComment = async (id, postId) => {
    try {
      const data = await likeCommentApi(id, comments, postId);
      console.log("updateData", data)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? {...data, likes: comment.likes + 1} : comment)),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }
  
  return {
    comments,
    setNewComment,
    setSelectedComment,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
  }
}