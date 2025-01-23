import { UserAvatar } from "@/entities/user"
import { UserDetail } from "@/features/user/user-detail"
import { Dialog, DialogContent, DialogHeader } from "@/shared"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useState } from "react"

interface UserAvatarWithDetailProps {
  userId?: number
  image?: string
  username?: string
}

function UserAvatarWithDetail(props: UserAvatarWithDetailProps) {
  const { userId, image, username } = props

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <UserAvatar image={image} username={username} onClick={handleOpen} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <UserDetail userId={userId} open={open} />
      </DialogContent>
    </Dialog>
  )
}

export { UserAvatarWithDetail }
