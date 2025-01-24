import { useState } from "react";
import { Post } from "../../../entities/types";
import useUpdatePost from "../../../shared/hooks/useUpdatePost";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
  Button,
 } from "../../../shared/ui";

export const NewPostModal = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false); 
  const {newPost, setNewPost, addPost } = useUpdatePost(setPosts, setShowAddDialog, setShowEditDialog);

  return(
    <div>
      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
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
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={addPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    
  );
};
  