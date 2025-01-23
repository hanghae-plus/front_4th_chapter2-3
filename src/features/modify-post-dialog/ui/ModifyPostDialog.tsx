import { useState } from "react";
import { IPost } from "../../../entities/post/api";
import { ModifyPostData } from "../../../entities/post/api/modifyPost";
import { useControllableState, usePreservedCallback } from "../../../shared/hooks";
import { Button, Dialog, Input, Textarea } from "../../../shared/ui";
import { OverlayElementProps } from "../../../shared/ui/OverlayController";

interface Props extends OverlayElementProps {
  post: IPost;
  onPostModify: (modifiedPost: ModifyPostData) => void;
}

const ModifyPostDialog = ({ post, opened: _opened, close, onPostModify }: Props) => {
  const [modifiedPost, setModifiedPost] = useState<ModifyPostData>({
    id: post.id,
    title: post.title,
    body: post.body,
  });

  const [opened, setOpened] = useControllableState({
    prop: _opened,
  });

  const handleOpenChange = usePreservedCallback((opened: boolean) => {
    if (!opened) close();
    setOpened(opened);
  });

  const handlePostModify = usePreservedCallback((modifiedPost: ModifyPostData) => {
    onPostModify(modifiedPost);
    close();
  });

  return (
    <Dialog open={opened} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={modifiedPost.title}
            onChange={(e) => setModifiedPost((prev) => ({ ...prev, title: e.target.value }))}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={modifiedPost.body}
            onChange={(e) => setModifiedPost((prev) => ({ ...prev, body: e.target.value }))}
          />
          <Button onClick={() => handlePostModify(modifiedPost)}>게시물 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default ModifyPostDialog;
