import { usePostStore } from "../../../entities/post/model/store"
import { Post } from "../../../entities/post/model/type"

export const useEditToPost = () => {
  const updatePost = usePostStore((state) => state.updatePost)
  const editPost = (updatedPost: Post) => {
    updatePost(updatedPost)
  }
  return { editPost }
}
