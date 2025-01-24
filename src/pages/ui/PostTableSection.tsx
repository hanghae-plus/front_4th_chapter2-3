import { useQueryPostTable } from "@/modules/post/api/useQueryPostTable"
import { PostTable } from "@/modules/post/ui/PostTable"
import { Loading } from "@/shared/ui"

export const PostTableSection = () => {
  const { data, isLoading } = useQueryPostTable()

  if (isLoading || !data) return <Loading />

  return <PostTable posts={data.posts} />
}
