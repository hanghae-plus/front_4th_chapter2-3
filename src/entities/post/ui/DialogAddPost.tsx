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

interface DialogAddPostProps {
  onOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  newPost: {
    id?: number;
    title: string;
    body: string;
    userId: number;
  };
  onSetNewPost: (
    type: string,
    postContent: {
      id?: number;
      title: string;
      body: string;
      userId: number;
    }
  ) => void;
  onAddPost: () => void;
}

export const DialogAddPost: React.FC<DialogAddPostProps> = ({
  newPost,
  onOpen,
  onOpenChange,
  onSetNewPost,
  onAddPost,
}) => {
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
            onChange={(e) =>
              onSetNewPost("title", { ...newPost, title: e.target.value })
            }
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) =>
              onSetNewPost("body", { ...newPost, body: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) =>
              onSetNewPost("userId", {
                ...newPost,
                userId: Number(e.target.value),
              })
            }
          />
          <Button onClick={onAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
