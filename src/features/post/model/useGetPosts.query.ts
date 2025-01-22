import { useQuery } from "@tanstack/react-query"
import { getPostsApi } from "../../../entities/post/api/getPosts.api"
import { getUsersApi } from "../../../entities/user/api/getUsers.api"
import { Post, PostDTO } from "../../../entities/post/model/types"
import { setAttributes } from "../../../shared/lib/setAttribute"
import { useEffect, useState } from "react"

interface GetPostsApiParams {
  limit: number
  skip: number
}

const useGetPosts = ({ limit, skip }: GetPostsApiParams) => {
  const [posts, setPosts] = useState<Post[]>([])
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      Promise.all([
        getPostsApi({
          limit,
          skip,
        }),
        getUsersApi(),
      ]).then(([postDTOs, users]) => {
        const posts = postDTOs.map((post: PostDTO) => {
          return setAttributes(
            post,
            "author",
            users.find((user) => user.id === post.userId),
          )
        })
        return posts as unknown as Post[] // TODO: 추론되게 못하나?
      }),
  })

  useEffect(() => {
    if (data) setPosts(data)
  }, [data])

  return { posts, setPosts, error, isLoading, refetchGetPosts: refetch }
}

export { useGetPosts }
