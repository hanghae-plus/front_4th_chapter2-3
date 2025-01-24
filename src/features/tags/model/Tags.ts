import type { Tag } from '@/entities/tags/model';
import type { ApiResponseWith } from '@/shared/api';

export interface Tags extends ApiResponseWith<Tag, 'tags'> {}
