import { Suspense } from "react";

import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";

import { useModalStore } from "@/features/modal";
import { PostDetailModal, PostTitle, PostUpdateModal, useMutationDeletePost, usePost } from "@/features/posts";
import { UserProfile } from "@/features/users";

import { Post } from "@/entities/posts";

import { Button, Loading, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui";

export const PostTable = () => {
  const { posts } = usePost();
  const { mutate: deletePost } = useMutationDeletePost();
  const { open } = useModalStore();

  const handleOpenPostDetailModal = (post: Post) => {
    open(<PostDetailModal post={post} />);
  };

  const handleOpenPostUpdataModal = (post: Post) => {
    open(<PostUpdateModal post={post} />);
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
              <PostTitle post={post} />
            </TableCell>
            <TableCell>
              <Suspense fallback={<Loading />}>
                <UserProfile userId={post.userId} />
              </Suspense>
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
                <Button variant="ghost" size="sm" onClick={() => handleOpenPostDetailModal(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleOpenPostUpdataModal(post)}>
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
  );
};
