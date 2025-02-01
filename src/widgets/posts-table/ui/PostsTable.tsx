import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from "lucide-react"

import { Post } from "../../../entities/post/model"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Button } from "../../../shared/ui"
import { User } from "../../../entities/user/model"
import { highlightText, useQueryParams } from "../../../shared/lib"

interface PostWithUser extends Post {
  author: User | undefined
}

interface PostsTableProps {
  posts: PostWithUser[]
  onViewDetail: (id: string) => void
  onClickProfile: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  searchQuery: string
  selectedTag: string
}

export const PostsTable = ({
  posts,
  onViewDetail,
  onClickProfile,
  onEdit,
  onDelete,
  searchQuery,
  selectedTag,
}: PostsTableProps) => {
  const { updateURLParams } = useQueryParams()
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
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"}`}
                      onClick={() => updateURLParams({ tag: tag, skip: "0" })}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => {
                  if (post.author) {
                    onClickProfile(post.author.id)
                  }
                }}
              >
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
                <Button variant="ghost" size="sm" onClick={() => onViewDetail(post.id.toString())}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(post.id)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(post.id)}>
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
