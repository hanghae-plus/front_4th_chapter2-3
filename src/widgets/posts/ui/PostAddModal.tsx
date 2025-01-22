import { useState } from "react";

import { DialogTitle } from "@radix-ui/react-dialog";

import { useMutationAddPost } from "@/features/posts";

import { Button, DialogContent, DialogHeader, Input, Textarea } from "@/shared/ui";

export const PostAddModal = () => {
  const { mutate: addPost } = useMutationAddPost();
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: 1,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새 게시물 추가</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Textarea
          rows={30}
          placeholder="내용"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <Input
          type="number"
          placeholder="사용자 ID"
          value={newPost.userId}
          onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
        />
        <Button onClick={() => addPost(newPost)}>게시물 추가</Button>
      </div>
    </DialogContent>
  );
};
