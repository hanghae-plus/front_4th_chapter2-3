import type { ApiResponseWith } from '@/shared/api';
import type { Post } from '../model';

export interface PostsResponse extends ApiResponseWith<Post, 'posts'> {}
