import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "../shared/ui"
import { Comments } from "./Comments"
import { highlightText } from "../utils/html"
import { DialogComponentProps } from "../hooks/useDialog"

type Props = DialogComponentProps

export const PostDetailDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <Comments postId={selectedPost?.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
