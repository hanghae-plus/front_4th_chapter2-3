import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/ui"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Post } from "@entities/post/types"
import { User } from "@entities/user/types"
import { highlightText } from "@pages/PostsManagerPage.tsx"
import { useModalStore } from "@shared/model"
import { PostUpdate } from "@features/post/ui/PostUpdate.tsx"
import { PostDetail } from "@features/post/ui/PostDetail.tsx"
import { useDeletePostMutation, usePostsQuery } from "@features/post/model"
import { useSearchParams } from "react-router-dom"
import { UserModal } from "@features/user/ui/UserModal.tsx"
import { Tag } from "@features/post/ui/Tag.tsx"

export function PostsTable() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") ?? ""

  const { postsWithUsers: posts } = usePostsQuery().data
  const { mutate: deletePost } = useDeletePostMutation()
  const { openModal } = useModalStore()

  const openPostDetail = (post: Post) => {
    openModal(<PostDetail post={post} />)
  }
  const openPostUpdate = (post: Post) => {
    openModal(<PostUpdate post={post} />)
  }
  const openUserModal = async (user: User) => {
    openModal(<UserModal user={user} />)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[150px]">작성자</TableHead>
            <TableHead className="w-[150px]">반응</TableHead>
            <TableHead className="w-[150px]">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>{highlightText(post.title, searchQuery)}</div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag, index) => <Tag key={tag + index} tag={tag} />)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
                  <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                  <span>{post.author?.username}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.reactions?.likes || 0}</span>
                  <ThumbsDown className="w-4 h-4" />
                  <span>{post.reactions?.dislikes || 0}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      openPostUpdate(post)
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
