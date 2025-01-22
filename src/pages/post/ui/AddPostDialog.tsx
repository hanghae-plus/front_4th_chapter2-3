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
import { initNewPost } from '../../../entities/post/config/initData.ts';
import { postPost } from '../../../entities/post/api';

const AddPostDialog = () => {
  const { showAddDialog, setShowAddDialog, newPost, setNewPost, setPosts } = usePostStore([
    'showAddDialog',
    'setShowAddDialog',
    'newPost',
    'setNewPost',
    'setPosts',
  ]);

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await postPost(newPost);
      setPosts((prevPosts) => [data, ...prevPosts]);
      setShowAddDialog(false);
      setNewPost(initNewPost);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            placeholder='제목'
            value={newPost.title}
            onChange={(e) => setNewPost((prevPost) => ({ ...prevPost, title: e.target.value }))}
          />
          <Textarea
            rows={30}
            placeholder='내용'
            value={newPost.body}
            onChange={(e) => setNewPost((prevPost) => ({ ...prevPost, body: e.target.value }))}
          />
          <Input
            type='number'
            placeholder='사용자 ID'
            value={newPost.userId}
            onChange={(e) =>
              setNewPost((prevPost) => ({ ...prevPost, userId: Number(e.target.value) }))
            }
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostDialog;
