import { ThumbsDown, ThumbsUp } from "lucide-react"

import { PostAuthProfile } from "../../../features/post/ui/PostAuthProfile"
import { PostDeleteButton } from "../../../features/post/ui/PostDeleteButton"
import { PostDetailOpenButton } from "../../../features/post/ui/PostDetailOpenButton"
import { PostEditDialogOpenButton } from "../../../features/post/ui/PostEditDialogOpenButton"
import { PostTags } from "../../../features/post/ui/PostTags"
import { HighlightText, Table } from "../../../shared/ui"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostTableProps {
  posts: PostWithUser[]
  searchQuery: string
  setSelectedTag: (tag: string) => void
  updateURL: () => void
  selectedTag: string
  openPostDetail: (post: PostWithUser) => void
  setSelectedPost: (post: PostWithUser) => void
  setShowEditDialog: (open: boolean) => void
}

export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  setSelectedTag,
  updateURL,
  openPostDetail,
  setSelectedPost,
  setShowEditDialog,
}: PostTableProps) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[50px]">ID</Table.Head>
          <Table.Head>제목</Table.Head>
          <Table.Head className="w-[150px]">작성자</Table.Head>
          <Table.Head className="w-[150px]">반응</Table.Head>
          <Table.Head className="w-[150px]">작업</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {posts.map((post) => (
          <Table.Row key={post.id}>
            <Table.Cell>{post.id}</Table.Cell>
            <Table.Cell>
              <div className="space-y-1">
                <HighlightText text={post.title} highlight={searchQuery} />
                <PostTags post={post} selectedTag={selectedTag} setSelectedTag={setSelectedTag} updateURL={updateURL} />
              </div>
            </Table.Cell>
            <Table.Cell>
              <PostAuthProfile post={post} />
            </Table.Cell>
            <Table.Cell>
              {/* 엔티티 */}
              {/* PostReaction */}
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-2">
                <PostDetailOpenButton post={post} openPostDetail={openPostDetail} />
                <PostEditDialogOpenButton
                  post={post}
                  setSelectedPost={setSelectedPost}
                  setShowEditDialog={setShowEditDialog}
                />
                <PostDeleteButton postId={post.id} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
