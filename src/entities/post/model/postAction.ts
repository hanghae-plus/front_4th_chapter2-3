import { atom } from "jotai"
import { newPostAtom, postsAtom } from "./postAtom"
let postIdCounter = 1
export const addPostAtom = atom(null, (get, set) => {
  const newPost = get(newPostAtom)
  const posts = get(postsAtom)

  set(postsAtom, [
    ...posts,
    {
      ...newPost,
      id: postIdCounter++,
    },
  ])

  set(newPostAtom, { id: 0, title: "", body: "", userId: 0 })
})
