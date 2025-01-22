import { useEffect } from "react"
import { useAtom, useAtomValue } from "jotai"

import { useUserQuery } from "../api"
import { selectedUserAtom, selectedUserIdAtom } from "../model"
import { dialogAtomFamily } from "../../../shared/model"
import { DialogContainer, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"

export const UserDialog = () => {
  const selectedUserId = useAtomValue(selectedUserIdAtom)
  const [showUserModal, setShowUserModal] = useAtom(dialogAtomFamily("user-detail"))
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)
  const { data, isLoading } = useUserQuery(selectedUserId, {
    enabled: showUserModal,
  })

  useEffect(() => {
    if (!isLoading && data) {
      setSelectedUser(data)
    }
  }, [isLoading, data, setSelectedUser])

  if (isLoading) {
    return null
  }

  return (
    <DialogContainer open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
          <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
            </p>
            <p>
              <strong>나이:</strong> {selectedUser?.age}
            </p>
            <p>
              <strong>이메일:</strong> {selectedUser?.email}
            </p>
            <p>
              <strong>전화번호:</strong> {selectedUser?.phone}
            </p>
            <p>
              <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
              {selectedUser?.address?.state}
            </p>
            <p>
              <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
            </p>
          </div>
        </div>
      </DialogContent>
    </DialogContainer>
  )
}
