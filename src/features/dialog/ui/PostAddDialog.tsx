import { DialogContent, DialogHeader, DialogTitle } from "@shared/dialog/ui";
import { useState } from "react";
import { Input } from "@shared/input/ui";
import { Textarea } from "@shared/textarea/ui";
import { Button } from "@shared/button/ui";
import { NewPost } from "@/types/post.ts";
import { useDialog } from "@shared/dialog/model/useDialog.ts";
import { usePost } from "@entities/post/model/usePost.ts";

const PostAddDialog = () => {
  const { close } = useDialog();
  const { handleAddPost } = usePost();
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 });

  const handleAddNewPost = (post: NewPost) => {
    handleAddPost(post, close);
  };

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
        <Button onClick={() => handleAddNewPost(newPost)}>게시물 추가</Button>
      </div>
    </DialogContent>
  );
};

export default PostAddDialog;
