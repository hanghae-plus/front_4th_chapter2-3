import { DialogContent } from "./DialogContent"
import { DialogHeader } from "./DialogHeader"
import { DialogRoot } from "./DialogRoot"
import { DialogTitle } from "./DialogTitle"

export const Dialog = Object.assign(DialogRoot, {
  Header: DialogHeader,
  Content: DialogContent,
  Title: DialogTitle,
})
