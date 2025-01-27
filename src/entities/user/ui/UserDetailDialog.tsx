import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { usePostsStore } from "../../entities/post/model/postsStore"

export const UserDetailDialog = () => {
  const { selectedUser, showUserModal, setShowUserModal } = usePostsStore()

  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {selectedUser?.image && (
              <img src={selectedUser.image} alt={selectedUser.username} className="w-16 h-16 rounded-full" />
            )}
            <div>
              <h3 className="font-semibold">{selectedUser?.username}</h3>
              <p className="text-sm text-gray-500">{selectedUser?.email}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
