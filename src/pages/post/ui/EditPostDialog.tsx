import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from '../../../shared/ui';
import usePostStore from '../../../features/post/model/usePostStore.ts';
import { putPost } from '../../../entities/post/api';

const EditPostDialog = () => {
  const { showEditDialog, setShowEditDialog, selectedPost, setSelectedPost, setPosts } =
    usePostStore([
      'showEditDialog',
      'setShowEditDialog',
      'selectedPost',
      'setSelectedPost',
      'setPosts',
    ]);

  // 게시물 업데이트
  const updatePost = async () => {
    if (!selectedPost) return;
    try {
      const data = await putPost(selectedPost);
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            placeholder='제목'
            value={selectedPost?.title || ''}
            onChange={(e) => setSelectedPost({ ...selectedPost!, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder='내용'
            value={selectedPost?.body || ''}
            onChange={(e) => setSelectedPost({ ...selectedPost!, body: e.target.value })}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
