import { atom } from "jotai"
import type { PostWithUsers } from "../../postsWithUsers/model"

export const newPostAtom = atom<PostWithUsers>({
  id: 0,
  title: "",
  body: "",
  userId: 1,
  reactions: {
    likes: 0,
    dislikes: 0,
  },
  views: 0,
  author: {
    id: 1,
    username: "Ava Harris",
    image: "https://dummyjson.com/icon/avahx/128",
  },
  tags: [],
})
