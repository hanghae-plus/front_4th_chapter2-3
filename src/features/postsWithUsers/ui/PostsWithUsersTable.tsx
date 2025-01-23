import { useEffect } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"

import { usePostsWithUsersQuery } from "../api"
import { postsTotalAtom, postsWithUsersAtom } from "../model"
import { limitAtom, skipAtom } from "../../searchPost/model"
import { PostTags } from "./PostTags.tsx"
import { OpenPostDetailButton } from "../../postDetail/ui"
import { OpenUpdatePostDialogButton } from "../../updatePost/ui"
import { DeletePostButton } from "../../deletePost/ui"
import { OpenUserDialogButton } from "../../../entities/user/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui/table"

export const PostsWithUsersTable = () => {
  const limit = useAtomValue(limitAtom)
  const skip = useAtomValue(skipAtom)
  const [posts, setPosts] = useAtom(postsWithUsersAtom)
  const setPostsTotal = useSetAtom(postsTotalAtom)
  const { postsResponse: postsData, isLoading } = usePostsWithUsersQuery({ limit, skip })

  useEffect(() => {
    if (!isLoading && postsData) {
      setPosts(postsData.posts || [])
      setPostsTotal(postsData.total)
    }
  }, [isLoading])

  if (isLoading) return <div className="flex justify-center p-4">로딩 중...</div>

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
        {posts?.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <PostTags post={post} />
            </TableCell>
            <TableCell>
              <OpenUserDialogButton userId={post.author?.id}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </OpenUserDialogButton>
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
                <OpenPostDetailButton post={post}>
                  <MessageSquare className="w-4 h-4" />
                </OpenPostDetailButton>
                <OpenUpdatePostDialogButton post={post}>
                  <Edit2 className="w-4 h-4" />
                </OpenUpdatePostDialogButton>
                <DeletePostButton postId={post.id}>
                  <Trash2 className="w-4 h-4" />
                </DeletePostButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
