import { useState } from "react";

import { useMutationAddComment } from "@/features/comments";

import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui";

interface CommentAddModalProps {
  postId: number;
}

export const CommentAddModal = ({ postId }: CommentAddModalProps) => {
  const { mutate: addComment } = useMutationAddComment();
  const [newComment, setNewComment] = useState({ body: "", postId, userId: 1 });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새 댓글 추가</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={newComment.body}
          onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
        />
        <Button onClick={() => addComment(newComment)}>댓글 추가</Button>
      </div>
    </DialogContent>
  );
};
