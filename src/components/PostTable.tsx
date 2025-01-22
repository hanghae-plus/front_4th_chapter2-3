import { Edit2, MessageSquare, Table, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shared/ui"
import { highlightText } from "../utils/html"
import { deletePost as deletePostFunction } from "../api/post"
import { getUser } from "../api/user"
import { getComments } from "../api/comment"
import { PostWithUser } from "../types/post"
import { User } from "../types/user"
import { useDialogStore } from "../store/dialog"
import { useParamsStore } from "../store/params"
import { useNavigate } from "react-router-dom"

interface Props {
  posts: PostWithUser[]
  onSelectPost: (post: PostWithUser | null) => void
  onSelectUser: (user: User | null) => void
}

export const PostTable = ({ posts, onSelectPost, onSelectUser }: Props) => {
  const { onOpenChange } = useDialogStore()
  const { searchQuery, selectedTag, updateURL, setParams } = useParamsStore()
  const navigate = useNavigate()

  const fetchComments = async (postId) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await getComments(postId)
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  const openPostDetail = (post: PostWithUser) => {
    onSelectPost(post)
    fetchComments(post.id)
    onOpenChange("postDetailDialog", true)
  }

  const openUserModal = async (user: User) => {
    try {
      const data = await getUser(user.id)
      onSelectUser(data)
      onOpenChange("userModal", true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  const deletePost = async (id) => {
    try {
      await deletePostFunction(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

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
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setParams("selectedTag", tag)
                        updateURL(navigate)
                      }}
                    >
                      {tag}
                    </span>
                  ))}
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
                    onSelectPost(post)
                    onOpenChange("editPostDialog", true)
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
  )
}
