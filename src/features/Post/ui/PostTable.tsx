import { type Post } from '@/entities/Post';
import { Table, TableHeader, TableRow, TableBody, TableHead, TableCell } from '@/shared/ui';
import { HighlightText } from '@/shared/ui/';
import { PostAuthor, PostTag, PostReactions, PostActions } from '.';

interface PostTableProps {
  posts: Post[];
  searchQuery: string;
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  onAuthorClick: (author: Post['author']) => void;
  onPostView: (post: Post) => void;
  onPostEdit: (post: Post) => void;
  onPostDelete: (id: string) => void;
}

export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  onTagSelect,
  onAuthorClick,
  onPostView,
  onPostEdit,
  onPostDelete,
}: PostTableProps) => (
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
              <div>{HighlightText({ text: post.title, highlight: searchQuery })}</div>
              <div className="flex flex-wrap gap-1">
                {post.tags?.map((tag) => (
                  <PostTag
                    key={tag}
                    tag={tag}
                    isSelected={selectedTag === tag}
                    onSelect={onTagSelect}
                  />
                ))}
              </div>
            </div>
          </TableCell>
          <TableCell>
            <PostAuthor author={post.author} onOpen={onAuthorClick} />
          </TableCell>
          <TableCell>
            <PostReactions likes={post.reactions?.likes} dislikes={post.reactions?.dislikes} />
          </TableCell>
          <TableCell>
            <PostActions
              post={post}
              onView={onPostView}
              onEdit={onPostEdit}
              onDelete={onPostDelete}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
