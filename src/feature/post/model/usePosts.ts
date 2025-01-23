import { useEffect, useState } from "react"
import { deletePostApi, getPostsApi } from "../../../entity/post/api/postApi"
import { getUsersApi } from "../../../entity/user/api/userApi"
import { Post } from "../../../entity/post/model/types"

type UsePostsProps = {
  limit: number
  skip: number
}
export const usePosts = ({ limit, skip }: UsePostsProps) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPost({ limit, skip })
  }, [limit, skip])

  const getPost = async ({ limit, skip }) => {
    try {
      setLoading(true)

      const postsData = getPostsApi({ limit, skip })
      const usersData = getUsersApi()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: number) => {
    try {
      await deletePostApi(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return { getPost, deletePost, posts, total, loading }
}
