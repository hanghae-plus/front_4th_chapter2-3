import { ChangeEvent } from 'react';

import { usePostStore } from '@/features/post';

import { postPost, NewPost, initNewPost } from '@/entities/post';

import { FormTypeElement } from '@/shared/model';
import { transformFormValue } from '@/shared/lib';
import { BaseDialog, Button, Input, Textarea } from '@/shared/ui';

const AddPostDialog = () => {
  const { showAddDialog, setShowAddDialog, newPost, setNewPost, setPosts } = usePostStore();

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
    <BaseDialog open={showAddDialog} onOpenChange={setShowAddDialog} title='새 게시물 추가'>
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
    </BaseDialog>
  );
};

export default AddPostDialog;
