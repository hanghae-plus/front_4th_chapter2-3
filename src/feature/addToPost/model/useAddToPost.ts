import { usePostStore } from "../../../entities/post/model/store"
import { Post } from "../../../entities/post/model/type"

export const useAddToPost = (post: Post) => {
  const addPost = usePostStore((state) => state.addPost)
  addPost(post)
}
