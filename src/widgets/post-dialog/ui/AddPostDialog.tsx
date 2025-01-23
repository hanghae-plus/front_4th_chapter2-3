import { ChangeEvent } from 'react';

import { usePostStore } from '@/features/post';

import { postPost, NewPost, initNewPost, Posts } from '@/entities/post';

import { FormTypeElement } from '@/shared/model';
import { transformFormValue } from '@/shared/lib';
import { BaseDialog, Button, Input, Textarea } from '@/shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AddPostDialog = () => {
  const queryClient = useQueryClient();
  const { showAddDialog, setShowAddDialog, newPost, setNewPost } = usePostStore();

  const handleChangePost =
    <T extends keyof NewPost>(key: T) =>
    (e: ChangeEvent<FormTypeElement>) => {
      const newValue = transformFormValue<NewPost, T>(e, key);
      setNewPost((prev) => ({ ...prev, ...newValue }));
    };

  const { mutateAsync } = useMutation({
    mutationFn: postPost,
    onSuccess: (data) => {
      queryClient.setQueryData<Posts>(['posts'], (prevData) =>
        prevData
          ? {
              ...prevData,
              posts: [
                { ...data, tags: [], reactions: { likes: 0, dislikes: 0 } },
                ...prevData.posts,
              ],
            }
          : undefined,
      );
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: async () => {
      setShowAddDialog(false);
      setNewPost(initNewPost);
    },
  });

  const addPost = async () => {
    await mutateAsync(newPost);
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
