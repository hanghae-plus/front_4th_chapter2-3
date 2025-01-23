import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui/Table/ui"
import { Button } from "../../../shared/ui/Button/ui"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import UserProfile from "../../user/ui/UserProfile"
import { highlightText } from "../../../shared/ui/highlightText"
import { Post, postPostsRequest } from "../../../entities/post/model/type"
import { useSearchStore } from "../../../shared/model/useSearchStore"
import usePostModalStore from "../../../entities/modal/model/usePostModalStore"
import PostForm from "./PostForm"
import PostDetail from "./PostDetail"

interface PostTableProps {
  posts: Post[]
  editPost: (form: postPostsRequest) => void
  deletePost: (id: number) => void
}
function PostTable(props: PostTableProps) {
  const { posts, editPost, deletePost } = props
  const { search, tag: tagItem, updateTag } = useSearchStore()
  const { openPostModal } = usePostModalStore()

  return (
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
                <div>{highlightText(post.title || "", search!)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        tag === tagItem
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        updateTag(tag)
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <UserProfile id={post.userId} />
            </TableCell>
            {/* 좋아요 */}
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
                {/* 게시물 상세 */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    openPostModal({
                      title: highlightText(post.title || "", search),
                      children: <PostDetail post={post} />,
                    })
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>

                {/* 게시물 수정 */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    openPostModal({
                      title: "게시물 수정",
                      children: <PostForm posts={post} onSubmit={editPost} />,
                    })
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>

                {/* 게시물 삭제 */}
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PostTable
