import { CardHeader, CardTitle } from "../../shared/ui"
import { AddPostDialog } from "../../features/post/ui/AddPostDialog"

export const Header = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>

        <AddPostDialog />
      </CardTitle>
    </CardHeader>
  )
}
