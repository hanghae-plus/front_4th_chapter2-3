import { PostReaction } from "../../../entities/post/ui/PostReaction"
import { useSearchQuery } from "../../../entities/tag/model/store/PageParamProvider"
import { PostAuthProfile } from "../../../features/post/ui/PostAuthProfile"
import { PostDeleteButton } from "../../../features/post/ui/PostDeleteButton"
import { PostDetailOpenButton } from "../../../features/post/ui/PostDetailOpenButton"
import { PostEditDialogOpenButton } from "../../../features/post/ui/PostEditDialogOpenButton"
import { PostTags } from "../../../features/post/ui/PostTags"
import { HighlightText, Table } from "../../../shared/ui"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostTableProps {
  posts: PostWithUser[]
}

export const PostTable = ({ posts }: PostTableProps) => {
  const searchQuery = useSearchQuery()

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
                <PostTags post={post} />
              </div>
            </Table.Cell>
            <Table.Cell>
              <PostAuthProfile post={post} />
            </Table.Cell>
            <Table.Cell>
              <PostReaction reactions={post.reactions} />
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-2">
                <PostDetailOpenButton post={post} searchQuery={searchQuery} />
                <PostEditDialogOpenButton post={post} />
                <PostDeleteButton postId={post.id} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
