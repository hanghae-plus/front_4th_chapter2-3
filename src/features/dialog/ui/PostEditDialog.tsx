import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@shared/dialog/ui";
import { Button } from "@shared/button/ui";
import { Textarea } from "@shared/textarea/ui";
import { Input } from "@shared/input/ui";
import { Post, UpdatePostRequest } from "@/types/post.ts";
import { useDialog } from "@shared/dialog/model/useDialog.ts";

interface PostEditDialogProps {
  selectedPost: Post;
  updatePost: (request: UpdatePostRequest, onComplete: () => void) => void;
}

function PostEditDialog({ selectedPost, updatePost }: PostEditDialogProps) {
  const [editingPost, setEditingPost] = useState<Pick<Post, "id" | "title" | "body">>({
    id: selectedPost.id,
    title: selectedPost.title,
    body: selectedPost.body,
  });
  const { close } = useDialog();

  const handleUpdatePost = () => {
    const request = { postId: editingPost.id, post: { title: editingPost.title, body: editingPost.body } };
    updatePost(request, () => close());
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>게시물 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input
          placeholder="제목"
          value={editingPost?.title || ""}
          onChange={(e) => setEditingPost({ ...selectedPost, title: e.target.value })}
        />
        <Textarea
          rows={15}
          placeholder="내용"
          value={editingPost?.body || ""}
          onChange={(e) => setEditingPost({ ...selectedPost, body: e.target.value })}
        />
        <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
      </div>
    </DialogContent>
  );
}

export default PostEditDialog;
