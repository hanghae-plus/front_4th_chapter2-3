import { atom } from "jotai"

import type { PostType } from "@entities/post/model"

export const selectedPostAtom = atom<PostType>({
  id: 0,
  title: "",
  body: "",
  userId: 1,
  tags: [],
  reactions: {
    likes: 0,
    dislikes: 0,
  },
  views: 0,
})
