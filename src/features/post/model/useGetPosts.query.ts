import { useQuery } from "@tanstack/react-query"
import { getPostsApi } from "../../../entities/post/api/getPosts.api"
import { getUsersApi } from "../../../entities/user/api/getUsers.api"
import { Post, PostDTO } from "../../../entities/post/model/types"
import { setAttributes } from "../../../shared/lib/setAttribute"
import { useEffect, useState } from "react"
import { getPostsByTextApi } from "../../../entities/post/api/getPostsByText.api"

interface GetPostsApiParams {
  limit: number
  skip: number
}

const useGetPosts = ({ limit, skip }: GetPostsApiParams) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [inputValue, setInputValue] = useState<string>("") // 임시 상태

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts", searchQuery],
    queryFn: () =>
      Promise.all([
        searchQuery
          ? getPostsByTextApi(searchQuery)
          : getPostsApi({
              limit,
              skip,
            }),
        getUsersApi(),
      ]).then(([{ posts: postDTOs, total }, users]) => {
        setTotal(total)
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

  const handleAddPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value) // 입력 값만 변경
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(inputValue) // Enter 누를 때만 상태 업데이트
    }
  }

  return {
    posts,
    total,
    searchQuery: inputValue,
    isLoading,
    refetchGetPosts: refetch,
    handlers: { handleAddPost, handleInputChange, handleKeyDown },
  }
}

export { useGetPosts }
