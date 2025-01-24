import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/table/ui";
import { Button } from "@shared/button/ui";
import { usePostFilter } from "@features/posts/model/usePostFilter.ts";
import { HighlightMatch } from "@shared/hightlight/ui/HighlightMatch.tsx";
import { usePostStore } from "@core/store/usePostStore.ts";
import { usePost } from "@entities/post/model/usePost.ts";
import { useDialog } from "@shared/dialog/model/useDialog.ts";
import PostDetailDialog from "@features/dialog/ui/PostDetailDialog.tsx";
import { Post } from "@/types/post.ts";
import PostEditDialog from "@features/dialog/ui/PostEditDialog.tsx";
import UserDetailDialog from "@features/dialog/ui/UserDetailDialog.tsx";

function PostTable() {
  const { posts, filters } = usePostStore();
  const { handleTagSelect } = usePostFilter();
  const { deletePost, updatePost } = usePost();
  const { open } = useDialog();

  const handleDetailDialog = (selectedPost: Post) => {
    open(<PostDetailDialog selectedPost={selectedPost} />);
  };

  const handleEditDialog = (selectedPost: Post) => {
    open(<PostEditDialog selectedPost={selectedPost} updatePost={updatePost} />);
  };

  const handleUserDetailDialog = (userId: number) => {
    open(<UserDetailDialog userId={userId} />);
  };

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
                <div>{HighlightMatch(post.title, filters.searchQuery)}</div>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => {
                    return (
                      <span
                        key={tag}
                        className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                          filters.selectedTag === tag
                            ? "text-white bg-blue-500 hover:bg-blue-600"
                            : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                        }`}
                        onClick={() => handleTagSelect(tag)}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <button onClick={() => handleUserDetailDialog(post.userId)}>
                <div className="flex items-center space-x-2">
                  <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                  <span>{post.author?.username}</span>
                </div>
              </button>
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
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4" onClick={() => handleDetailDialog(post)} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit2 className="w-4 h-4" onClick={() => handleEditDialog(post)} />
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
  );
}

export default PostTable;
