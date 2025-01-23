import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Button, DialogHeader, Input, Textarea } from "@shared/ui";
import { usePostStore } from "../model";
import { addPost } from "@entities/post";

const PostEditDialog = () => {
  const { posts, newPost, showAddDialog, setPosts, setShowAddDialog, setNewPost } = usePostStore();

  const addPostAndUpdate = async () => {
    const data = await addPost(newPost);

    setPosts([data, ...posts]);
    setShowAddDialog(false);
    setNewPost({ title: "", body: "", userId: 1 });
  };

  return (
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
          <Button onClick={addPostAndUpdate}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditDialog;
