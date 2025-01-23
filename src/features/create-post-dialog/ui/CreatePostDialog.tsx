import { useState } from "react";
import { CreatePostData } from "../../../entities/post/api/createPost";
import { useControllableState, usePreservedCallback } from "../../../shared/hooks";
import { Button, Dialog, Input, Textarea } from "../../../shared/ui";
import { OverlayElementProps } from "../../../shared/ui/OverlayController";

interface Props extends OverlayElementProps {
  onPostCreate: (newPost: CreatePostData) => void;
}

const CreatePostDialog = ({ opened: _opened, close, onPostCreate }: Props) => {
  const [newPost, setNewPost] = useState<CreatePostData>({ userId: 1, title: "", body: "" });

  const [opened, setOpened] = useControllableState({
    prop: _opened,
  });

  const handleOpenChange = usePreservedCallback((opened: boolean) => {
    if (!opened) close();
    setOpened(opened);
  });

  const handlePostCreate = usePreservedCallback((newPost: CreatePostData) => {
    onPostCreate(newPost);
    close();
  });

  return (
    <Dialog open={opened} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost((prev) => ({ ...prev, body: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost((prev) => ({ ...prev, userId: Number(e.target.value) }))}
          />
          <Button onClick={() => handlePostCreate(newPost)}>게시물 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default CreatePostDialog;
