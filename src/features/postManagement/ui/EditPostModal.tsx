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

export const EditPostModal = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showEditDialog, setShowEditDialog] = useState(false)
  const {selectedPost, setSelectedPost, handleUpdatePost} = useUpdatePost(setPosts, setShowEditDialog, setShowEditDialog);

  return(
    <div>
      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => {
                if (selectedPost) {
                  setSelectedPost({ ...selectedPost, title: e.target.value });
                }
              }}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => {
                if (selectedPost) {
                  setSelectedPost({ ...selectedPost, body: e.target.value });
                }
              }}
            />
            <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    
  );
};
  