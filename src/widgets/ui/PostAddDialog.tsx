import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader, Input, Textarea, Button, useModal } from "../../shared";
import { createPost, Post } from "../../entities";

export function PostAddDialog({
  posts,
  setPosts,
  newPost,
  setNewPost,
}: {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  newPost: {
    title: string;
    body: string;
    userId: number;
  };
  setNewPost: React.Dispatch<
    React.SetStateAction<{
      title: string;
      body: string;
      userId: number;
    }>
  >;
}) {
  const { handleModalToggle, isOpenModal } = useModal("addPostModal");

  // 게시물 추가
  // shared/lib/fetch
  const addPost = async () => {
    try {
      const data = await createPost({ newPost });
      setPosts([data, ...posts]);
      handleModalToggle();
      setNewPost({ title: "", body: "", userId: 1 });
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={handleModalToggle}>
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
  );
}
