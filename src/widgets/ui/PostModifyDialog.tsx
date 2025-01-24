import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader, Input, Textarea, Button, useModal } from "../../shared";
import { Post, updatePost } from "../../entities";

export function PostModifyDialog({
  post,
  setSelectedPost,
  posts,
  setPosts,
}: {
  post: Post;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
  const { handleModalToggle, isOpenModal } = useModal("modifyPostModal");

  // 게시물 업데이트
  const setUpdatedPost = async () => {
    try {
      const data = await updatePost({ post: post! });
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      handleModalToggle();
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={handleModalToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={post?.title || ""}
            onChange={(e) => setSelectedPost({ ...post!, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={post?.body || ""}
            onChange={(e) => setSelectedPost({ ...post!, body: e.target.value })}
          />
          <Button onClick={setUpdatedPost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
