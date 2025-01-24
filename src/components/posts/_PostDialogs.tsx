import React from 'react';
import { Post } from '../../models/type';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from '../../shared/ui';

interface PostDialogsProps {
  showAddDialog: boolean;
  showEditDialog: boolean;
  showDetailDialog: boolean;
  selectedPost: Post | null;
  newPost: { title: string; body: string; userId: number };
  setNewPost: (post: { title: string; body: string; userId: number }) => void;
  setSelectedPost: (post: Post | null) => void;
  onAddPost: () => void;
  onUpdatePost: () => void;
}

const PostDialogs: React.FC<PostDialogsProps> = ({
  showAddDialog,
  showEditDialog,
  showDetailDialog,
  selectedPost,
  newPost,
  setNewPost,
  setSelectedPost,
  onAddPost,
  onUpdatePost,
}) => {
  return (
    <>
      {/* Add Post Dialog */}
      <Dialog open={showAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Input
              placeholder='제목'
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={4}
              placeholder='내용'
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Button onClick={onAddPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={showEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Input
              placeholder='제목'
              value={selectedPost?.title || ''}
              onChange={(e) =>
                setSelectedPost(selectedPost ? { ...selectedPost, title: e.target.value } : null)
              }
            />
            <Textarea
              rows={4}
              placeholder='내용'
              value={selectedPost?.body || ''}
              onChange={(e) =>
                setSelectedPost(selectedPost ? { ...selectedPost, body: e.target.value } : null)
              }
            />
            <Button onClick={onUpdatePost}>수정</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <p>{selectedPost?.body}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDialogs;
