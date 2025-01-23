import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Input,
  Button,
} from "../../../shared/ui";
import { NewPostProps } from "../model/types";
import { useAtom } from "jotai";
import { newPostAtom } from "../../../app/store/atom";

interface DialogAddPostProps {
  onOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onAddPost: (newPost: NewPostProps) => void;
}

export const DialogAddPost: React.FC<DialogAddPostProps> = ({
  onOpen,
  onOpenChange,
  onAddPost,
}) => {
  const [newPost, setNewPost] = useAtom(newPostAtom);

  return (
    <Dialog
      open={onOpen}
      onOpenChange={onOpenChange}
    >
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
            onChange={(e) =>
              setNewPost({ ...newPost, userId: parseInt(e.target.value) })
            }
          />
          <Button onClick={() => onAddPost(newPost)}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
