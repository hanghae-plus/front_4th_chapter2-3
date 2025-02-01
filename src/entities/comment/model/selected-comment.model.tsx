import { createContext, useContext, useState } from "react"

import type { Comment } from "./types"

type SelectedCommentContextType = {
  selectedComment: Comment | null
  setSelectedComment: (comment: Comment) => void
  resetSelectedComment: () => void
}

const SelectedCommentContext = createContext<SelectedCommentContextType | null>(null)

export const SelectedCommentProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const resetSelectedComment = () => {
    setSelectedComment(null)
  }

  return (
    <SelectedCommentContext.Provider value={{ selectedComment, setSelectedComment, resetSelectedComment }}>
      {children}
    </SelectedCommentContext.Provider>
  )
}

export const useSelectedComment = () => {
  const context = useContext(SelectedCommentContext)

  if (!context) throw new Error("useSelectedComment must be used within a SelectedCommentProvider")

  return context
}
