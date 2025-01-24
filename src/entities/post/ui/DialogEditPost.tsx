import { useAtom } from "jotai";
import { editDialogAtom, selectedPostAtom } from "../../../app/store/atom";
import { Button } from "../../../shared/ui";

import { Input, Textarea } from "../../../shared/ui";
import { usePosts } from "../lib/usePosts";
import { DialogWrapper } from "../../../shared/ui/dialog/DialogWrapper";

export const DialogEditPost = () => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [showEditDialog, setShowEditDialog] = useAtom(editDialogAtom);

  const { handleUpdatePost } = usePosts();

  return (
    <DialogWrapper
      open={showEditDialog}
      onOpenChange={setShowEditDialog}
      title="게시물 수정"
    >
      <Input
        placeholder="제목"
        value={selectedPost?.title || ""}
        onChange={(e) =>
          setSelectedPost({ ...selectedPost, title: e.target.value })
        }
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={selectedPost?.body || ""}
        onChange={(e) =>
          setSelectedPost({ ...selectedPost, body: e.target.value })
        }
      />
      <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
    </DialogWrapper>
  );
};
