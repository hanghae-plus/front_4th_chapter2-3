import React from "react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  HighlightText,
} from "../../../shared/ui"
import { MessageSquare } from "lucide-react"
import { usePostTableStore } from "../model/store"

export const PostDetailDialog = () => {
  const { selectedPost, setShowPostDetailDialog } = usePostTableStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title || ""} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body || ""} highlight={searchQuery} />
          </p>
          {selectedPost && renderComments(selectedPost?.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}
