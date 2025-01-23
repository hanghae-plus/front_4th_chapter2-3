import { CreatePostParams, PostsTypes } from "../api/postApi"

export const optimisticAddPost = (posts: PostsTypes["posts"], newPost: CreatePostParams["body"]) => {
  const optimisticPost = {
    ...newPost,
    id: Date.now(),
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
  }
  return [...posts, optimisticPost]
}
