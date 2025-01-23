// 태그 타입
export interface TagType {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

// 태그 스토어 상태 타입
export interface TagStoreState {
  selectedTag: string;
  tags: TagType[];
}

// 태그 스토어 액션 타입
export interface TagStoreActions {
  setSelectedTag: (tag: string) => void;
  setTags: (tags: TagType[]) => void;
}

// 태그 스토어 타입
export type TagStore = TagStoreState & TagStoreActions;
