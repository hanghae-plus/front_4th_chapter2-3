import { useState } from "react";
import { CreateCommentData } from "../../../entities/comment/api/createComment";
import { useControllableState, usePreservedCallback } from "../../../shared/hooks";
import { Button, Dialog, Textarea } from "../../../shared/ui";
import { OverlayElementProps } from "../../../shared/ui/OverlayController";

interface Props extends OverlayElementProps {
  postId: number;
  onCommentCreate: (newComment: CreateCommentData) => void;
}

const CreateCommentDialog = ({ postId, opened: _opened, close, onCommentCreate }: Props) => {
  const [newComment, setNewComment] = useState<CreateCommentData>({ postId, userId: 1, body: "" });

  const [opened, setOpened] = useControllableState({
    prop: _opened,
  });

  const handleOpenChange = usePreservedCallback((opened: boolean) => {
    if (!opened) close();
    setOpened(opened);
  });

  const handleCommentCreate = usePreservedCallback((newComment: CreateCommentData) => {
    onCommentCreate(newComment);
    close();
  });

  return (
    <Dialog open={opened} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 댓글 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment((prev) => ({ ...prev, body: e.target.value }))}
          />
          <Button onClick={() => handleCommentCreate(newComment)}>댓글 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default CreateCommentDialog;
