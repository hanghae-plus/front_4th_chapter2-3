import type { ApiResponseWith } from '@/shared/api';
import type { Comment } from '../model';

export type CommentsResponse = ApiResponseWith<Comment, 'comments'>;
