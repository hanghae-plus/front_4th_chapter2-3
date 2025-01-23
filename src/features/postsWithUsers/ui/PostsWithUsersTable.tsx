import { useEffect } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"

import { usePostsWithUsersQuery } from "../api"
import { postsTotalAtom, postsWithUsersAtom } from "../model"
import { usePostsByTagQuery } from "../../serchPost/api"
import { limitAtom, searchQueryAtom, selectedTagAtom, skipAtom } from "../../serchPost/model"
import { selectedPostAtom } from "../../postDetail/model"
import { selectedUserIdAtom } from "../../../entities/user/model"
import { useDeletePostMutation } from "../../deletePost/api"
import { dialogAtomFamily } from "../../../shared/model"
import { highlightText } from "../../../shared/lib"
import { Button } from "../../../shared/ui/common"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui/table"
import type { PostType } from "../../../entities/post/model"

export const PostsWithUsersTable = () => {
  const searchQuery = useAtomValue(searchQueryAtom)

  // Post Detail Dialog
  const setShowDetailDialog = useSetAtom(dialogAtomFamily("post-detail"))
  const setSelectedPost = useSetAtom(selectedPostAtom)

  // Edit Post Dialog
  const setShowEditDialog = useSetAtom(dialogAtomFamily("edit-post"))

  // Delete Post
  const deletePostMutation = useDeletePostMutation({
    onSuccess: (postId) => {
      setPosts((prev) => prev?.filter((post) => post.id !== postId))
    },
  })

  // User
  const setSelectedUserId = useSetAtom(selectedUserIdAtom)
  const setUserModal = useSetAtom(dialogAtomFamily("user-detail"))
  const openUserModal = (userId: number | undefined) => {
    setSelectedUserId(userId)
    setUserModal(true)
  }

  // Get PostsWithUsers
  const limit = useAtomValue(limitAtom)
  const skip = useAtomValue(skipAtom)
  const [posts, setPosts] = useAtom(postsWithUsersAtom)
  const setPostsTotal = useSetAtom(postsTotalAtom)
  const { postsResponse: postsData, isLoading } = usePostsWithUsersQuery({ limit, skip })

  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const { data: postsByTag, isLoading: isPostsByTagQueryLoading } = usePostsByTagQuery(selectedTag)

  useEffect(() => {
    if (!isLoading && postsData) {
      setPosts(postsData.posts || [])
      setPostsTotal(postsData.total)
    }
  }, [isLoading])

  useEffect(() => {
    if (!isPostsByTagQueryLoading && postsByTag) {
      setPosts(postsByTag.posts || [])
    }
  }, [selectedTag, postsByTag, setPosts, isPostsByTagQueryLoading])

  const openPostDetail = (post: PostType) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
  }

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
                        setSelectedTag(tag)
                      }}
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
                onClick={() => openUserModal(post?.author?.id)}
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
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePostMutation.mutate(post.id)}>
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
