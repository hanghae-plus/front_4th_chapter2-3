import { useState } from "react"

import { useCommentActions } from "../../comment/model/useCommentActions"
import { usePostStore } from "./store"
import { User } from "../../../entities/user/model/types"
import { Post } from "../../../entities/post/model/types"
import { useDialogStore } from "../../../shared/model/useDialogStore"

export const usePostDetailActions = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { setSelectedPost } = usePostStore()
  const { fetchComments } = useCommentActions()
  const { setShowUserModal, setShowPostDetailDialog } = useDialogStore()

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return {
    selectedUser,
    openPostDetail,
    openUserModal,
  }
}
