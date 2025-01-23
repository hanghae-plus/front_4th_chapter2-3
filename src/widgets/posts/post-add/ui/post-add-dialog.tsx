import { PostAddForm } from "@/features/post/post-add"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared"
import { Plus } from "lucide-react"
import { useState } from "react"

function PostAddDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <PostAddForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export { PostAddDialog }
