import { useState } from "react";
import { IComment, ModifyCommentData } from "../../../entities/comment/api";
import { useControllableState, usePreservedCallback } from "../../../shared/hooks";
import { Button, Dialog, Textarea } from "../../../shared/ui";
import { OverlayElementProps } from "../../../shared/ui/OverlayController";

interface Props extends OverlayElementProps {
  comment: IComment;
  onCommentModify: (modifiedComment: ModifyCommentData) => void;
}

const ModifyCommentDialog = ({ comment, opened: _opened, close, onCommentModify }: Props) => {
  const [modifiedComment, setModifiedComment] = useState<ModifyCommentData>({
    id: comment.id,
    body: comment.body,
  });

  const [opened, setOpened] = useControllableState({
    prop: _opened,
  });

  const handleOpenChange = usePreservedCallback((opened: boolean) => {
    if (!opened) close();
    setOpened(opened);
  });

  const handleCommentModify = usePreservedCallback((modifiedComment: ModifyCommentData) => {
    onCommentModify(modifiedComment);
    close();
  });

  return (
    <Dialog open={opened} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={modifiedComment?.body || ""}
            onChange={(e) => setModifiedComment((prev) => ({ ...prev, body: e.target.value }))}
          />
          <Button onClick={() => handleCommentModify(modifiedComment)}>댓글 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default ModifyCommentDialog;
