import { useState } from "react";

import { useModalStore } from "@/features/modal";
import { useMutationUpdatePost } from "@/features/posts";

import { Post } from "@/entities/posts";

import { Button, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui";

interface PostUpdateModal {
  post: Post;
}

export const PostUpdateModal = ({ post }: PostUpdateModal) => {
  const { mutate: updatePost } = useMutationUpdatePost();
  const { close } = useModalStore();

  const [editedPost, setEditedPost] = useState(post);

  const handleUpdatePost = () => {
    updatePost(editedPost);
    close();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>게시물 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={editedPost.title}
          onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
        />
        <Textarea
          rows={15}
          placeholder="내용"
          value={editedPost.body}
          onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
        />
        <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
      </div>
    </DialogContent>
  );
};
