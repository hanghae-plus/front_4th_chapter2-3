import { useState } from "react";

import { useMutationUpdateComment } from "@/features/comments";
import { useModalStore } from "@/features/modal";

import { Comment } from "@/entities/comments";

import { Button, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui";

interface CommentUpdateModalProps {
  comment: Comment;
}

export const CommentUpdateModal = ({ comment }: CommentUpdateModalProps) => {
  const { mutate: updateComment } = useMutationUpdateComment();
  const { close } = useModalStore();
  const [selectedComment, setSelectedComment] = useState(comment);

  const handleUpdateComment = () => {
    updateComment(selectedComment);
    close();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>댓글 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={selectedComment?.body || ""}
          onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
        />
        <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
      </div>
    </DialogContent>
  );
};
