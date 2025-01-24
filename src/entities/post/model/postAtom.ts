// const [posts, setPosts] = useState<TPost[]>([])

import { atom } from "jotai"
import { IPost } from "./types"

export const postsAtom = atom<IPost[]>([])
export const newPostAtom = atom<IPost>({
  id: 1,
  title: "",
  body: "",
  userId: 1,
})

export const selectedPostAtom = atom<IPost | null>(null)
