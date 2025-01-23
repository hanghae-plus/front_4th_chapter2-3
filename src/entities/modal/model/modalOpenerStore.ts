import { atom } from "jotai"
import { useState } from "react"

export const showAddDialogAtom = atom<boolean>(false)
export const showEditDialogAtom = atom<boolean>(false);
export const showAddCommentDialogAtom = atom<boolean>(false);
export const showEditCommentDialogAtom = atom<boolean>(false);
export const showPostDetailDialogAtom = atom<boolean>(false);
export const showUserModalAtom = atom<boolean>(false);