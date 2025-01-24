import type { Post } from '@/entities/posts/model';
import type { ApiResponseWith } from '@/shared/api';

export type Posts = ApiResponseWith<Post, 'posts'>;
