import { Dialog, DialogContent, DialogTitle, Button, DialogHeader, Input, Textarea } from "@shared/ui";

import { Post, updatePost } from "@entities/post";
import { useUserQuery } from "@features/user";
import { getPostWithUser } from "@features/post/model/post";
import { usePostStore } from "@features/post";

const PostEditDialog = () => {
  const { posts, selectedPost, showEditDialog, setPosts, setSelectedPost, setShowEditDialog } = usePostStore();

  const { data: usersData } = useUserQuery();

  const editPostAndUpdate = async () => {
    if (!selectedPost) return;

    const data = await updatePost(selectedPost);

    setPosts(
      posts.map((post) =>
        post.id === data.id ? { ...data, author: null } : getPostWithUser(post, usersData?.users ?? []),
      ),
    );
    setShowEditDialog(false);
  };

  return (
    <Dialog open={showEditDialog && !!selectedPost} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...(selectedPost as Post), title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...(selectedPost as Post), body: e.target.value })}
          />
          <Button onClick={editPostAndUpdate}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditDialog;
