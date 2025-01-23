import { Button, Input, Textarea } from '../../../shared/ui';
import { NewPost } from '../../../entities/post/model';
import { ChangeEvent } from 'react';
import { FormTypeElement } from '../../../shared/model';
import { transformFormValue } from '../../../shared/lib';
import { postPost } from '../../../entities/post/api';
import { initNewPost } from '../../../entities/post/config/init-data.ts';
import usePostStore from '../model/use-post-store.ts';

const AddPostForm = () => {
  const { newPost, setNewPost, setPosts, setShowAddDialog } = usePostStore([
    'newPost',
    'setPosts',
    'setShowAddDialog',
    'setNewPost',
  ]);
  const handleChangePost =
    <T extends keyof NewPost>(key: T) =>
    (e: ChangeEvent<FormTypeElement>) => {
      const newValue = transformFormValue<NewPost, T>(e, key);
      setNewPost((prev) => ({ ...prev, ...newValue }));
    };

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
    <div className='space-y-4'>
      <Input placeholder='제목' value={newPost.title} onChange={handleChangePost('title')} />
      <Textarea
        rows={30}
        placeholder='내용'
        value={newPost.body}
        onChange={handleChangePost('body')}
      />
      <Input
        type='number'
        placeholder='사용자 ID'
        value={newPost.userId}
        onChange={handleChangePost('userId')}
      />
      <Button onClick={addPost}>게시물 추가</Button>
    </div>
  );
};

export default AddPostForm;
