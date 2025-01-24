import { Card, CardContent } from "../../../shared/ui"
import { usePostStore } from "../model/store"
import { PostTable } from "./PostTable"

export const PostList = () => {
  const { loading } = usePostStore()

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <PostTable />
      </CardContent>
    </Card>
  )
}
