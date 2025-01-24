import type { Post } from '@/entities/posts/model';

export interface NewPost extends Pick<Post, 'title' | 'body' | 'userId'> {}
