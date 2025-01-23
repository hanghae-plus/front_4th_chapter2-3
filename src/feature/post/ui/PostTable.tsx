import {
  Button,
  HighlightText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/ui"

import { useQueryParams } from "../../../shared/model/useQueryParams"
import { usePosts } from "../model/usePosts"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useModalStore } from "../../../shared/model/useModalStore"
import EditPostModal from "./EditPostModal"
import { getCommentsApi } from "../../../entity/comment/api/commentApi"
import { PostDetailModal } from "./PostDetailModal"
import { Post } from "../../../entity/post/model/types"
import UserInfoModal from "../../user/ui/UserInfoModal"

function PostTable() {
  const { openModal } = useModalStore()
  const { searchQuery, skip, limit, updateURL, selectedTag, setSelectedTag } = useQueryParams()

  const { posts, deletePost } = usePosts({ limit, skip })

  //TODO:  포스트 상세 정리 필요
  const openPostDetail = async (post: Post) => {
    await getCommentsApi(post.id)
    openModal(<PostDetailModal post={post} />)
  }

  //TODO:  사용자 모달 열기 정리 필요
  const openUserModal = async (user) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      openModal(<UserInfoModal userInfo={userData} />)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
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
                <div>
                  <HighlightText text={post.title} highlight={searchQuery} />
                </div>
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
                        setSelectedTag(tag)
                        updateURL()
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
                    openModal(<EditPostModal post={post} />)
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

export { PostTable }
